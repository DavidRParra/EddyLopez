import { NextResponse } from "next/server";
import { writeFile, unlink } from "fs/promises";
import path from "path";
import mysql from "mysql2/promise";

// Configuración de la conexión a MySQL usando tus variables exactas del .env
const pool = mysql.createPool({
  host: process.env.DB_SERVER || "72.60.26.63",
  user: process.env.DB_USER_LOGIN,
  password: process.env.DB_PASSWORD_LOGIN,
  database: process.env.DB_DATABASE_LOGIN,
  port: Number(process.env.DB_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const UPLOAD_DIR = path.join(process.cwd(), "public/uploads/videos");
const MAX_STORAGE_BYTES = 5 * 1024 * 1024 * 1024; // 5 GB en bytes

// 1. GET: Ver todas las publicaciones y el espacio total consumido
export async function GET() {
  try {
    const [rows]: any = await pool.query(
      `SELECT v.id, v.title, v.file_name, v.file_path, v.file_size, v.user_id, v.created_at, a.username 
       FROM videos v 
       JOIN admins a ON v.user_id = a.id 
       ORDER BY v.created_at DESC`
    );

    const [sumRows]: any = await pool.query("SELECT SUM(file_size) as total_size FROM videos");
    const totalBytes = sumRows[0]?.total_size || 0;
    const usedGB = (totalBytes / (1024 * 1024 * 1024)).toFixed(3);

    return NextResponse.json({
      success: true,
      videos: rows,
      usedStorageBytes: totalBytes,
      usedStorageGB: usedGB,
      maxStorageGB: 5,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Error al obtener las publicaciones: " + String(error) },
      { status: 500 }
    );
  }
}

// 2. POST: Subir un nuevo video validando el límite de 5 GB
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const title = formData.get("title") as string;
    const userId = formData.get("user_id") as string;

    if (!file || !title || !userId) {
      return NextResponse.json(
        { success: false, error: "Faltan datos obligatorios (archivo, título o usuario)." },
        { status: 400 }
      );
    }

    const [sumRows]: any = await pool.query("SELECT SUM(file_size) as total_size FROM videos");
    const currentSize = sumRows[0]?.total_size || 0;
    const newFileSize = file.size;

    if (currentSize + newFileSize > MAX_STORAGE_BYTES) {
      const currentGB = (currentSize / (1024 * 1024 * 1024)).toFixed(2);
      return NextResponse.json(
        {
          success: false,
          error: `Límite de 5 GB alcanzado. Espacio actual ocupado: ${currentGB} GB.`,
        },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const sanitizedName = file.name.replace(/\s+/g, "_");
    const fileName = `${uniqueSuffix}-${sanitizedName}`;
    const filePath = path.join(UPLOAD_DIR, fileName);
    const relativePath = `/uploads/videos/${fileName}`;

    const { mkdir } = await import("fs/promises");
    await mkdir(UPLOAD_DIR, { recursive: true }).catch(() => {});
    await writeFile(filePath, buffer);

    await pool.query(
      `INSERT INTO videos (title, file_name, file_path, file_size, user_id) VALUES (?, ?, ?, ?, ?)`,
      [title, fileName, relativePath, newFileSize, userId]
    );

    return NextResponse.json({ success: true, message: "Publicación de video creada exitosamente." });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Error en el servidor al subir el archivo: " + String(error) },
      { status: 500 }
    );
  }
}

// 3. PUT: Actualizar una publicación
export async function PUT(req: Request) {
  try {
    const formData = await req.formData();
    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const file = formData.get("file") as File | null;

    if (!id || !title) {
      return NextResponse.json(
        { success: false, error: "El ID y el título son obligatorios." },
        { status: 400 }
      );
    }

    const [rows]: any = await pool.query("SELECT * FROM videos WHERE id = ?", [id]);
    if (rows.length === 0) {
      return NextResponse.json({ success: false, error: "Video no encontrado." }, { status: 404 });
    }

    const currentVideo = rows[0];
    let newFileName = currentVideo.file_name;
    let newFilePath = currentVideo.file_path;
    let newFileSize = currentVideo.file_size;

    if (file && file.size > 0) {
      const [sumRows]: any = await pool.query("SELECT SUM(file_size) as total_size FROM videos WHERE id != ?", [id]);
      const currentSizeWithoutThis = sumRows[0]?.total_size || 0;

      if (currentSizeWithoutThis + file.size > MAX_STORAGE_BYTES) {
        return NextResponse.json(
          { success: false, error: "El nuevo archivo excede el límite de 5 GB." },
          { status: 400 }
        );
      }

      try {
        await unlink(path.join(UPLOAD_DIR, currentVideo.file_name));
      } catch {}

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      newFileName = `${uniqueSuffix}-${file.name.replace(/\s+/g, "_")}`;
      newFilePath = `/uploads/videos/${newFileName}`;
      newFileSize = file.size;

      await writeFile(path.join(UPLOAD_DIR, newFileName), buffer);
    }

    await pool.query(
      `UPDATE videos SET title = ?, file_name = ?, file_path = ?, file_size = ? WHERE id = ?`,
      [title, newFileName, newFilePath, newFileSize, id]
    );

    return NextResponse.json({ success: true, message: "Publicación actualizada correctamente." });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Error al actualizar: " + String(error) },
      { status: 500 }
    );
  }
}

// 4. DELETE: Eliminar una publicación
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Se requiere el ID del video." }, { status: 400 });
    }

    const [rows]: any = await pool.query("SELECT * FROM videos WHERE id = ?", [id]);
    if (rows.length === 0) {
      return NextResponse.json({ success: false, error: "Publicación no encontrada." }, { status: 404 });
    }

    const video = rows[0];

    try {
      await unlink(path.join(UPLOAD_DIR, video.file_name));
    } catch {}

    await pool.query("DELETE FROM videos WHERE id = ?", [id]);

    return NextResponse.json({ success: true, message: "Publicación y archivo eliminados correctamente." });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Error al eliminar: " + String(error) },
      { status: 500 }
    );
  }
}
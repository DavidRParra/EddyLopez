import { NextResponse } from "next/server";
import { mkdir, writeFile, unlink } from "fs/promises";
import path from "path";
import mysql from "mysql2/promise";

// Ejecutar estas rutas exclusivamente en el servidor Node.js.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Conexión a MySQL.
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

// Directorio de almacenamiento externo en el VPS (Opción 2 con Nginx).
const UPLOAD_DIR = "/var/www/EddyLopez/videos";

const MAX_STORAGE_BYTES = 5 * 1024 * 1024 * 1024;

type VideoRow = {
  id: number;
  title: string;
  file_name: string;
  file_path: string;
  file_size: number;
  user_id: number;
  created_at: Date | string;
  username?: string | null;
};

function errorResponse(message: string, status: number) {
  return NextResponse.json(
    { success: false, error: message },
    { status }
  );
}

function sanitizeFileName(name: string) {
  return path
    .basename(name)
    .replace(/[^a-zA-Z0-9._-]/g, "_");
}

function getStoredFilePath(fileName: string) {
  // No permitir nombres de archivo que escapen del directorio.
  if (
    !fileName ||
    path.basename(fileName) !== fileName ||
    fileName.includes("/") ||
    fileName.includes("\\")
  ) {
    throw new Error("Nombre de archivo no válido.");
  }

  return path.join(UPLOAD_DIR, fileName);
}

function isValidId(value: unknown): value is string {
  return (
    typeof value === "string" &&
    /^\d+\$/.test(value) &&
    Number(value) > 0 &&
    Number.isSafeInteger(Number(value))
  );
}

function isValidTitle(value: unknown): value is string {
  return (
    typeof value === "string" &&
    value.trim().length > 0 &&
    value.trim().length <= 255
  );
}

function isFile(value: FormDataEntryValue | null): value is File {
  return (
    value !== null &&
    typeof value !== "string" &&
    typeof value.arrayBuffer === "function" &&
    typeof value.size === "number"
  );
}

function isValidVideo(file: File) {
  const extension = path
    .extname(file.name)
    .toLowerCase();

  const allowedExtensions = [
    ".mp4",
    ".webm",
    ".mov",
    ".m4v",
    ".avi",
  ];

  return (
    file.size > 0 &&
    allowedExtensions.includes(extension) &&
    file.type.startsWith("video/")
  );
}

// ======================================================
// GET: Obtener videos y espacio de almacenamiento usado.
// ======================================================
export async function GET() {
  try {
    const [rows] = await pool.query(
      `SELECT
         v.id,
         v.title,
         v.file_name,
         v.file_path,
         v.file_size,
         v.user_id,
         v.created_at,
         a.username
       FROM videos v
       LEFT JOIN admins a ON a.id = v.user_id
       ORDER BY v.created_at DESC`
    );

    const [sumRows] = await pool.query(
      `SELECT COALESCE(SUM(file_size), 0) AS total_size
       FROM videos`
    );

    const videos = rows as VideoRow[];
    const totals = sumRows as Array<{ total_size: number | string }>;

    const totalBytes = Number(totals[0]?.total_size ?? 0);
    const usedGB = (totalBytes / (1024 ** 3)).toFixed(3);

    return NextResponse.json({
      success: true,
      videos,
      usedStorageBytes: totalBytes,
      usedStorageGB: usedGB,
      maxStorageGB: 5,
    });
  } catch (error) {
    console.error("Error al obtener videos:", error);

    return errorResponse(
      "Error al obtener las publicaciones.",
      500
    );
  }
}

// ======================================================
// POST: Subir un video nuevo.
// ======================================================
export async function POST(req: Request) {
  let savedFilePath: string | null = null;

  try {
    const formData = await req.formData();

    const fileValue = formData.get("file");
    const titleValue = formData.get("title");
    const userIdValue = formData.get("user_id");

    if (
      !isFile(fileValue) ||
      !isValidTitle(titleValue) ||
      !isValidId(userIdValue)
    ) {
      return errorResponse(
        "Faltan datos obligatorios o son inválidos. Verifica el título, el archivo y el administrador.",
        400
      );
    }

    const file = fileValue;
    const title = titleValue.trim();
    const userId = Number(userIdValue);

    if (!isValidVideo(file)) {
      return errorResponse(
        "El archivo debe ser un video válido en formato MP4, WEBM, MOV, M4V o AVI.",
        400
      );
    }

    // Comprobar que el administrador exista.
    const [adminRows] = await pool.query(
      "SELECT id FROM admins WHERE id = ? LIMIT 1",
      [userId]
    );

    if ((adminRows as Array<{ id: number }>).length === 0) {
      return errorResponse(
        "El administrador indicado no existe.",
        400
      );
    }

    // Comprobar almacenamiento actual.
    const [sumRows] = await pool.query(
      `SELECT COALESCE(SUM(file_size), 0) AS total_size
       FROM videos`
    );

    const totals = sumRows as Array<{ total_size: number | string }>;
    const currentSize = Number(totals[0]?.total_size ?? 0);

    if (currentSize + file.size > MAX_STORAGE_BYTES) {
      return errorResponse(
        `No hay suficiente espacio. Uso actual: ${(currentSize / (1024 ** 3)).toFixed(2)} GB de 5 GB.`,
        400
      );
    }

    await mkdir(UPLOAD_DIR, { recursive: true });

    const uniqueSuffix =
      `${Date.now()}-${Math.round(Math.random() * 1e9)}`;

    const fileName =
      `${uniqueSuffix}-${sanitizeFileName(file.name)}`;

    savedFilePath = getStoredFilePath(fileName);

    const buffer = Buffer.from(await file.arrayBuffer());

    await writeFile(savedFilePath, buffer);

    const relativePath = `/videos-srv/${fileName}`;

    await pool.query(
      `INSERT INTO videos
         (title, file_name, file_path, file_size, user_id)
       VALUES (?, ?, ?, ?, ?)`,
      [
        title,
        fileName,
        relativePath,
        file.size,
        userId,
      ]
    );

    return NextResponse.json(
      {
        success: true,
        message: "Publicación de video creada exitosamente.",
      },
      { status: 201 }
    );
  } catch (error) {
    if (savedFilePath) {
      await unlink(savedFilePath).catch(() => {});
    }

    console.error("Error al subir video:", error);

    return errorResponse(
      "Error en el servidor al subir el archivo.",
      500
    );
  }
}

// ======================================================
// PUT: Actualizar el título o reemplazar un video.
// ======================================================
export async function PUT(req: Request) {
  let newFilePath: string | null = null;

  try {
    const formData = await req.formData();

    const idValue = formData.get("id");
    const titleValue = formData.get("title");
    const fileValue = formData.get("file");

    if (!isValidId(idValue) || !isValidTitle(titleValue)) {
      return errorResponse(
        "El ID y un título válido son obligatorios.",
        400
      );
    }

    if (
      fileValue !== null &&
      typeof fileValue === "string"
    ) {
      return errorResponse(
        "El archivo enviado no es válido.",
        400
      );
    }

    const id = Number(idValue);
    const title = titleValue.trim();
    const file = isFile(fileValue) ? fileValue : null;

    const [rows] = await pool.query(
      "SELECT * FROM videos WHERE id = ? LIMIT 1",
      [id]
    );

    const existingVideos = rows as VideoRow[];

    if (existingVideos.length === 0) {
      return errorResponse("Video no encontrado.", 404);
    }

    const currentVideo = existingVideos[0];

    let newFileName = currentVideo.file_name;
    let updatedFilePath = currentVideo.file_path;
    let newFileSize = Number(currentVideo.file_size);

    // Si se envió un archivo, comprobarlo y guardarlo primero.
    if (file && file.size > 0) {
      if (!isValidVideo(file)) {
        return errorResponse(
          "El archivo debe ser un video válido en formato MP4, WEBM, MOV, M4V o AVI.",
          400
        );
      }

      const [sumRows] = await pool.query(
        `SELECT COALESCE(SUM(file_size), 0) AS total_size
         FROM videos
         WHERE id <> ?`,
        [id]
      );

      const totals = sumRows as Array<{
        total_size: number | string;
      }>;

      const currentSizeWithoutThis = Number(
        totals[0]?.total_size ?? 0
      );

      if (
        currentSizeWithoutThis + file.size >
        MAX_STORAGE_BYTES
      ) {
        return errorResponse(
          "El nuevo archivo excede el límite de almacenamiento de 5 GB.",
          400
        );
      }

      await mkdir(UPLOAD_DIR, { recursive: true });

      const uniqueSuffix =
        `${Date.now()}-${Math.round(Math.random() * 1e9)}`;

      newFileName =
        `${uniqueSuffix}-${sanitizeFileName(file.name)}`;

      newFilePath = getStoredFilePath(newFileName);

      const buffer = Buffer.from(await file.arrayBuffer());

      await writeFile(newFilePath, buffer);

      updatedFilePath = `/videos-srv/${newFileName}`;
      newFileSize = file.size;
    }

    try {
      await pool.query(
        `UPDATE videos
         SET title = ?, file_name = ?, file_path = ?, file_size = ?
         WHERE id = ?`,
        [
          title,
          newFileName,
          updatedFilePath,
          newFileSize,
          id,
        ]
      );
    } catch (error) {
      if (newFilePath) {
        await unlink(newFilePath).catch(() => {});
      }

      throw error;
    }

    // Solo después de actualizar MySQL se elimina el archivo anterior.
    if (newFilePath) {
      try {
        const oldPath = getStoredFilePath(
          currentVideo.file_name
        );

        await unlink(oldPath);
      } catch (error) {
        console.error(
          "No se pudo eliminar el archivo anterior:",
          error
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: "Publicación actualizada correctamente.",
    });
  } catch (error) {
    console.error("Error al actualizar video:", error);

    return errorResponse(
      "Error al actualizar la publicación.",
      500
    );
  }
}

// ======================================================
// DELETE: Eliminar un video y su registro.
// ======================================================
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const idValue = searchParams.get("id");

    if (!isValidId(idValue)) {
      return errorResponse(
        "Se requiere un ID de video válido.",
        400
      );
    }

    const id = Number(idValue);

    const [rows] = await pool.query(
      "SELECT * FROM videos WHERE id = ? LIMIT 1",
      [id]
    );

    const videos = rows as VideoRow[];

    if (videos.length === 0) {
      return errorResponse(
        "Publicación no encontrada.",
        404
      );
    }

    const video = videos[0];

    // Eliminar primero el registro de MySQL.
    await pool.query(
      "DELETE FROM videos WHERE id = ?",
      [id]
    );

    let fileDeleted = true;

    try {
      const filePath = getStoredFilePath(video.file_name);
      await unlink(filePath);
    } catch (error) {
      fileDeleted = false;

      console.error(
        "El registro se eliminó, pero no se pudo eliminar el archivo:",
        error
      );
    }

    return NextResponse.json({
      success: true,
      message: fileDeleted
        ? "Publicación y archivo eliminados correctamente."
        : "El registro se eliminó, pero el archivo físico requiere limpieza manual.",
      fileDeleted,
    });
  } catch (error) {
    console.error("Error al eliminar video:", error);

    return errorResponse(
      "Error al eliminar la publicación.",
      500
    );
  }
}
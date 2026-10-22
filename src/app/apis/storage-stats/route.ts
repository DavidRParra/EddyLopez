import { NextResponse } from "next/server";
import { stat, readdir } from "fs/promises";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ROOT_DIR = "/var/www/EddyLopez";

// Función recursiva para calcular el peso total de una carpeta en el VPS
async function getDirectorySize(directory: string): Promise<number> {
  let totalSize = 0;
  try {
    const entries = await readdir(directory, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        totalSize += await getDirectorySize(fullPath);
      } else if (entry.isFile()) {
        const fileStat = await stat(fullPath);
        totalSize += fileStat.size;
      }
    }
  } catch (error) {
    // Si la carpeta aún no existe o no hay permisos, retorna 0
    console.error("No se pudo leer la ruta:", directory);
  }
  return totalSize;
}

export async function GET() {
  try {
    const totalBytes = await getDirectorySize(ROOT_DIR);
    const usedGB = (totalBytes / (1024 ** 3)).toFixed(3);
    const maxBytes = 5 * 1024 * 1024 * 1024; // 5 GB

    return NextResponse.json({
      success: true,
      usedStorageBytes: totalBytes,
      usedStorageGB: usedGB,
      maxStorageGB: 5,
      isFull: totalBytes >= maxBytes,
    });
  } catch (error) {
    console.error("Error al calcular el almacenamiento:", error);
    return NextResponse.json(
      { success: false, error: "Error al calcular el almacenamiento." },
      { status: 500 }
    );
  }
}
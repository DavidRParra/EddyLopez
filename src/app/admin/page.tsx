'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaVideo, FaTrash, FaEdit, FaUpload, FaDatabase, FaExclamationTriangle, FaEye } from "react-icons/fa";

interface Video {
  id: number;
  title: string;
  file_name: string;
  file_path: string;
  file_size: number;
  username: string;
  user_id: number;
  created_at: string;
}

export default function AdminVideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [usedBytes, setUsedBytes] = useState(0);
  const [usedGB, setUsedGB] = useState("0");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Estados para modales / formularios
  const [isUploading, setIsUploading] = useState(false);
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);

  // Form inputs
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [userId, setUserId] = useState("1"); // ID del usuario administrador por defecto

  const MAX_LIMIT_GB = 5;
  const maxBytes = MAX_LIMIT_GB * 1024 * 1024 * 1024;

  // Cargar datos al iniciar
  const fetchVideos = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch("/apis/videos");
      const data = await res.json();
      
      if (res.ok && (data.success || Array.isArray(data.videos) || Array.isArray(data))) {
        setVideos(data.videos || data);
        setUsedBytes(data.usedStorageBytes || 0);
        setUsedGB(data.usedStorageGB || "0");
      } else {
        setError(data.error || "No se pudieron cargar los videos.");
      }
    } catch (err) {
      setError("Error de red al conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // Calcular porcentaje de uso y espacio libre
  const percentage = Math.min(Number(((usedBytes / maxBytes) * 100).toFixed(1)), 100);
  const freePercentage = Number((100 - percentage).toFixed(1));
  const freeGB = Math.max(MAX_LIMIT_GB - Number(usedGB), 0).toFixed(2);

  // Parámetros de la Dona SVG
  const radius = 52;
  const strokeWidth = 36;
  const circumference = 2 * Math.PI * radius; // ≈ 326.72
  
  const usedLength = (percentage / 100) * circumference;
  const freeLength = (freePercentage / 100) * circumference;

  // Cálculo de los ángulos medios (en radianes) para colocar las etiquetas DENTRO del grosor del anillo
  // Ángulo de inicio: -90° (arriba del círculo)
  const angleUsedMid = -Math.PI / 2 + (percentage / 100) * Math.PI;
  const angleFreeMid = -Math.PI / 2 + (percentage / 100) * 2 * Math.PI + (freePercentage / 100) * Math.PI;

  const xUsed = 80 + radius * Math.cos(angleUsedMid);
  const yUsed = 80 + radius * Math.sin(angleUsedMid);

  const xFree = 80 + radius * Math.cos(angleFreeMid);
  const yFree = 80 + radius * Math.sin(angleFreeMid);

  // Manejar Subida (POST)
  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title) {
      setError("Por favor complete el título y seleccione un archivo de video.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);
    formData.append("user_id", userId);

    try {
      setLoading(true);
      setError("");
      
      const res = await fetch("/apis/videos", {
        method: "POST",
        body: formData,
      });
      
      const data = await res.json();

      if (res.ok && data.success) {
        setSuccessMsg(data.message || "Video subido correctamente.");
        setTitle("");
        setFile(null);
        setIsUploading(false);
        fetchVideos();
      } else {
        setError(data.error || "El servidor rechazó la subida del video.");
      }
    } catch (err) {
      setError("Error crítico al subir el archivo. Verifique su conexión o el tamaño del video.");
    } finally {
      setLoading(false);
    }
  };

  // Manejar Actualización (PUT)
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVideo) return;

    const formData = new FormData();
    formData.append("id", String(editingVideo.id));
    formData.append("title", title);
    if (file) formData.append("file", file);

    try {
      setLoading(true);
      setError("");
      
      const res = await fetch("/apis/videos", {
        method: "PUT",
        body: formData,
      });
      
      const data = await res.json();

      if (res.ok && data.success) {
        setSuccessMsg(data.message || "Publicación actualizada correctamente.");
        setEditingVideo(null);
        setTitle("");
        setFile(null);
        fetchVideos();
      } else {
        setError(data.error || "No se pudo actualizar la publicación.");
      }
    } catch (err) {
      setError("Error al actualizar la publicación.");
    } finally {
      setLoading(false);
    }
  };

  // Manejar Eliminación (DELETE)
  const handleDelete = async (id: number) => {
    if (!confirm("¿Estás seguro de eliminar este video? Se borrará del servidor Linux y de la base de datos.")) return;

    try {
      setError("");
      const res = await fetch(`/apis/videos?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setSuccessMsg("Video eliminado correctamente.");
        fetchVideos();
      } else {
        alert(data.error || "No se pudo eliminar el video.");
      }
    } catch (err) {
      alert("Error al intentar eliminar.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Cabecera */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b pb-6">
          <div>
            <h1 className="text-3xl font-bold text-[#002861] flex items-center gap-3">
              <FaVideo /> Panel de Videos - Eddy López Inmobiliaria
            </h1>
            <p className="text-gray-600 mt-1">Gestión de publicaciones de video y control estricto de almacenamiento.</p>
          </div>
          
          {/* Botones de acción del panel */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <Link
              href="/videos"
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2.5 rounded-xl font-medium shadow-sm transition flex items-center justify-center gap-2 flex-1 md:flex-initial"
            >
              <FaEye /> Ver Videos Públicos
            </Link>
            <button
              onClick={() => { setIsUploading(true); setEditingVideo(null); setTitle(""); setFile(null); setError(""); }}
              className="bg-[#002861] hover:bg-[#001d47] text-white px-5 py-2.5 rounded-xl font-medium shadow-md transition flex items-center justify-center gap-2 flex-1 md:flex-initial"
            >
              <FaUpload /> Subir Nuevo Video
            </button>
          </div>
        </div>

        {/* Alertas de Error o Éxito */}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg flex justify-between items-center shadow-sm">
            <span>{error}</span>
            <button onClick={() => setError("")} className="font-bold">&times;</button>
          </div>
        )}
        {successMsg && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-lg flex justify-between items-center shadow-sm">
            <span>{successMsg}</span>
            <button onClick={() => setSuccessMsg("")} className="font-bold">&times;</button>
          </div>
        )}

        {/* Tarjeta de Medidor de Almacenamiento */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-[#002861] flex items-center gap-3 mb-3">
              <FaDatabase /> Almacenamiento (Límite: 5 GB)
            </h2>
            <p className="text-gray-600 text-lg mb-6">
              Control en tiempo real del espacio ocupado por los archivos de video multimedia
            </p>
            <div className="flex flex-wrap gap-6 text-base font-semibold">
              <div className="flex items-center gap-3">
                <span className="w-4 h-4 rounded-full bg-[#002861] inline-block"></span>
                <span>Ocupado: <strong className="text-lg">{usedGB} GB</strong></span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-4 h-4 rounded-full bg-[#3B82F6] inline-block"></span>
                <span>Disponible: <strong className="text-lg">{freeGB} GB</strong></span>
              </div>
            </div>
            {percentage > 85 && (
              <p className="text-sm text-red-600 mt-4 flex items-center gap-2 font-bold">
                <FaExclamationTriangle /> Atención: Estás cerca de alcanzar el límite máximo de almacenamiento en disco.
              </p>
            )}
          </div>

          {/* Gráfico Circular con Números Dentro de las Franjas de Color */}
          <div className="relative w-48 h-48 flex items-center justify-center flex-shrink-0">
            <svg viewBox="0 0 160 160" className="w-full h-full">
              {/* Sección Disponible (#3B82F6) */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke="#3B82F6"
                strokeWidth={strokeWidth}
                fill="transparent"
                strokeDasharray={`${freeLength} ${circumference}`}
                strokeDashoffset={-usedLength}
                transform="rotate(-90 80 80)"
              />
              {/* Sección Usado (#002861) */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke="#002861"
                strokeWidth={strokeWidth}
                fill="transparent"
                strokeDasharray={`${usedLength} ${circumference}`}
                strokeDashoffset="0"
                transform="rotate(-90 80 80)"
                className="transition-all duration-700 ease-out"
              />

              {/* Texto dentro de la sección Usado (solo si hay espacio) */}
              {percentage > 3 && (
                <text
                  x={xUsed}
                  y={yUsed}
                  fill="#FFFFFF"
                  fontSize="13"
                  fontWeight="bold"
                  textAnchor="middle"
                  dominantBaseline="central"
                >
                  {percentage}%
                </text>
              )}

              {/* Texto dentro de la sección Disponible */}
              {freePercentage > 3 && (
                <text
                  x={xFree}
                  y={yFree}
                  fill="#FFFFFF"
                  fontSize="13"
                  fontWeight="bold"
                  textAnchor="middle"
                  dominantBaseline="central"
                >
                  {freePercentage}%
                </text>
              )}
            </svg>
          </div>
        </div>

        {/* Modal / Formulario flotante para Crear o Editar */}
        {(isUploading || editingVideo) && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 relative animate-in fade-in zoom-in duration-200">
              <h3 className="text-xl font-bold text-[#002861] mb-4">
                {editingVideo ? "Editar Publicación de Video" : "Subir Video al Servidor"}
              </h3>
              
              <form onSubmit={editingVideo ? handleUpdate : handleUpload} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Título del Video / Propiedad</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ej. Villa moderna en La Vega - Recorrido"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#002861] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {editingVideo ? "Reemplazar archivo de video (Opcional)" : "Archivo de Video (MP4, MOV, etc.)"}
                  </label>
                  <input
                    type="file"
                    accept="video/*"
                    required={!editingVideo}
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="w-full border border-gray-300 rounded-lg p-2 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#002861] file:text-white hover:file:bg-[#001d47]"
                  />
                  <p className="text-xs text-gray-500 mt-1">Asegúrate de que el video no supere el espacio disponible en disco.</p>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => { setIsUploading(false); setEditingVideo(null); setError(""); }}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 font-medium"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-5 py-2 bg-[#002861] text-white rounded-lg hover:bg-[#001d47] font-medium shadow disabled:opacity-50"
                  >
                    {loading ? "Procesando..." : editingVideo ? "Actualizar Cambios" : "Subir y Guardar"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Tabla de Publicaciones con Letras Grandes */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-200">
            <h3 className="text-2xl font-bold text-[#002861]">Videos Publicados ({videos.length})</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700 text-sm font-extrabold uppercase tracking-wider border-b border-gray-200">
                  <th className="py-5 px-8">Título</th>
                  <th className="py-5 px-8">Archivo</th>
                  <th className="py-5 px-8">Tamaño</th>
                  <th className="py-5 px-8">Admin</th>
                  <th className="py-5 px-8">Fecha</th>
                  <th className="py-5 px-8 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-base">
                {videos.length === 0 && !loading ? (
                  <tr>
                    <td colSpan={6} className="text-center py-12 text-gray-500 text-lg font-medium">
                      No hay videos publicados todavía.
                    </td>
                  </tr>
                ) : (
                  videos.map((video) => (
                    <tr key={video.id} className="hover:bg-gray-50 transition">
                      <td className="py-5 px-8 font-bold text-gray-900 text-lg">{video.title}</td>
                      <td className="py-5 px-8 text-gray-600 truncate max-w-xs font-mono text-sm">{video.file_name}</td>
                      <td className="py-5 px-8 text-gray-700 font-semibold">{(video.file_size / (1024 * 1024)).toFixed(2)} MB</td>
                      <td className="py-5 px-8 text-gray-700 font-semibold">{video.username || "Admin"}</td>
                      <td className="py-5 px-8 text-gray-600 font-medium">{video.created_at ? new Date(video.created_at).toLocaleDateString() : 'Reciente'}</td>
                      <td className="py-5 px-8 text-center space-x-3">
                        <button
                          onClick={() => { setEditingVideo(video); setTitle(video.title); setFile(null); setError(""); }}
                          className="bg-blue-50 text-blue-600 p-3 rounded-xl hover:bg-blue-100 transition inline-flex items-center text-lg shadow-sm"
                          title="Editar"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(video.id)}
                          className="bg-red-50 text-red-600 p-3 rounded-xl hover:bg-red-100 transition inline-flex items-center text-lg shadow-sm"
                          title="Eliminar"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
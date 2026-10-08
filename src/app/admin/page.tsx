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
  const [userId, setUserId] = useState("1"); // Cambiar según tu lógica de sesión de admin

  const MAX_LIMIT_GB = 5;
  const maxBytes = MAX_LIMIT_GB * 1024 * 1024 * 1024;

  // Cargar datos al iniciar
  const fetchVideos = async () => {
    try {
      setLoading(true);
      const res = await fetch("/apis/videos");
      const data = await res.json();
      if (data.success) {
        setVideos(data.videos);
        setUsedBytes(data.usedStorageBytes);
        setUsedGB(data.usedStorageGB);
      } else {
        setError(data.error);
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

  // Calcular porcentaje de uso para la barra de almacenamiento
  const percentage = Math.min(Number(((usedBytes / maxBytes) * 100).toFixed(1)), 100);

  // Manejar Subida (POST)
  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);
    formData.append("user_id", userId);

    try {
      setLoading(true);
      const res = await fetch("/apis/videos", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        setSuccessMsg(data.message);
        setTitle("");
        setFile(null);
        setIsUploading(false);
        fetchVideos();
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Error al subir el archivo.");
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
      const res = await fetch("/apis/videos", {
        method: "PUT",
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        setSuccessMsg(data.message);
        setEditingVideo(null);
        setTitle("");
        setFile(null);
        fetchVideos();
      } else {
        setError(data.error);
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
      const res = await fetch(`/apis/videos?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        setSuccessMsg("Video eliminado correctamente.");
        fetchVideos();
      } else {
        alert(data.error);
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
              onClick={() => { setIsUploading(true); setEditingVideo(null); setTitle(""); setFile(null); }}
              className="bg-[#002861] hover:bg-[#001d47] text-white px-5 py-2.5 rounded-xl font-medium shadow-md transition flex items-center justify-center gap-2 flex-1 md:flex-initial"
            >
              <FaUpload /> Subir Nuevo Video
            </button>
          </div>
        </div>

        {/* Alertas de Error o Éxito */}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg flex justify-between items-center">
            <span>{error}</span>
            <button onClick={() => setError("")} className="font-bold">&times;</button>
          </div>
        )}
        {successMsg && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-lg flex justify-between items-center">
            <span>{successMsg}</span>
            <button onClick={() => setSuccessMsg("")} className="font-bold">&times;</button>
          </div>
        )}

        {/* Tarjeta de Medidor de Almacenamiento (5 GB Limit) */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold text-[#002861] flex items-center gap-2">
              <FaDatabase /> Almacenamiento en Servidor Linux (Límite: 5 GB)
            </h2>
            <span className={`text-sm font-bold px-3 py-1 rounded-full ${percentage > 90 ? 'bg-red-100 text-red-700' : 'bg-blue-50 text-[#002861]'}`}>
              {usedGB} GB / 5.00 GB ({percentage}%)
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className={`h-4 transition-all duration-500 ${percentage > 90 ? 'bg-red-600' : 'bg-[#002861]'}`}
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          {percentage > 85 && (
            <p className="text-xs text-red-600 mt-2 flex items-center gap-1 font-medium">
              <FaExclamationTriangle /> Atención: Estás cerca de alcanzar el límite máximo de almacenamiento en disco.
            </p>
          )}
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
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => { setIsUploading(false); setEditingVideo(null); }}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 font-medium"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-5 py-2 bg-[#002861] text-white rounded-lg hover:bg-[#001d47] font-medium shadow"
                  >
                    {loading ? "Guardando..." : editingVideo ? "Actualizar Cambios" : "Subir y Guardar"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Tabla de Publicaciones */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="font-bold text-gray-800">Videos Publicados ({videos.length})</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider border-b">
                  <th className="py-3 px-6">Título</th>
                  <th className="py-3 px-6">Archivo</th>
                  <th className="py-3 px-6">Tamaño</th>
                  <th className="py-3 px-6">Admin</th>
                  <th className="py-3 px-6">Fecha</th>
                  <th className="py-3 px-6 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-sm">
                {videos.length === 0 && !loading ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-gray-500">
                      No hay videos publicados todavía.
                    </td>
                  </tr>
                ) : (
                  videos.map((video) => (
                    <tr key={video.id} className="hover:bg-gray-50/60 transition">
                      <td className="py-4 px-6 font-medium text-gray-900">{video.title}</td>
                      <td className="py-4 px-6 text-gray-500 truncate max-w-xs">{video.file_name}</td>
                      <td className="py-4 px-6 text-gray-600">{(video.file_size / (1024 * 1024)).toFixed(2)} MB</td>
                      <td className="py-4 px-6 text-gray-600">{video.username}</td>
                      <td className="py-4 px-6 text-gray-500">{new Date(video.created_at).toLocaleDateString()}</td>
                      <td className="py-4 px-6 text-center space-x-2">
                        <button
                          onClick={() => { setEditingVideo(video); setTitle(video.title); setFile(null); }}
                          className="bg-blue-50 text-blue-600 p-2 rounded-lg hover:bg-blue-100 transition inline-flex items-center"
                          title="Editar"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(video.id)}
                          className="bg-red-50 text-red-600 p-2 rounded-lg hover:bg-red-100 transition inline-flex items-center"
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
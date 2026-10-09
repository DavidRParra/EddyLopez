'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface VideoPost {
  id: number;
  title: string;
  description: string;
  file_path: string;
  created_at: string;
}

export default function VideosAdminPage() {
  const [videos, setVideos] = useState<VideoPost[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const res = await fetch('/apis/videos');
      const data = await res.json();
      
      if (Array.isArray(data)) {
        setVideos(data);
      } else if (data.videos && Array.isArray(data.videos)) {
        setVideos(data.videos);
      } else {
        setVideos([]);
      }
    } catch (error) {
      console.error('Error cargando videos:', error);
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6 sm:p-8 lg:p-12">
      <div className="max-w-6xl mx-auto">
        {/* Encabezado */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-6 border-b border-gray-300 pb-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Videos y Publicaciones
            </h1>
            <p className="text-base sm:text-lg text-gray-600 mt-2">
              Aqui podrá ver los vídeos y recursos visuales del Arq. Eddy Lopez.
            </p>
          </div>
          {/* Botón redirigido a /admin */}
          {/*<Link
            href="/admin"
            className="!bg-blue-600 !hover:bg-blue-700 text-white font-semibold text-base px-6 py-3 rounded-xl shadow-md transition transform hover:scale-105 text-center w-full sm:w-auto inline-block"
          >
            + Nuevo Video
          </Link>*/}
        </div>

        {/* Estado de carga */}
        {loading ? (
          <div className="flex justify-center items-center py-28">
            <div className="animate-spin rounded-full h-14 w-14 border-b-4 border-blue-600"></div>
          </div>
        ) : videos.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-md border border-gray-200">
            <p className="text-gray-600 text-lg font-medium">No hay videos registrados en la base de datos.</p>
          </div>
        ) : (
          /* Cuadrícula ampliada */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {videos.map((video) => (
              <div 
                key={video.id} 
                className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden flex flex-col transition hover:shadow-xl"
              >
                {/* Contenedor del Video */}
                <div className="relative w-full aspect-video bg-black">
                  <video 
                    src={video.file_path} 
                    controls 
                    preload="metadata"
                    className="w-full h-full object-cover"
                    onError={(e) => console.error(`Error al cargar el video: ${video.file_path}`, e)}
                  >
                    Tu navegador no soporta la reproducción de video.
                  </video>
                </div>

                {/* Contenido de la tarjeta */}
                <div className="p-6 sm:p-8 flex flex-col flex-grow">
                  <span className="text-sm font-bold text-blue-600 mb-2 uppercase tracking-wider">
                    {video.created_at ? new Date(video.created_at).toLocaleDateString() : 'Reciente'}
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    {video.title}
                  </h2>
                  {/*<p className="text-base text-gray-700 mb-5 leading-relaxed flex-grow">
                    Video alojado en el servidor listo para publicación.
                  </p>*/}

                  {/* Depuración visual de la ruta */}
                  {/*<div className="bg-gray-50 border border-gray-200 p-3 rounded-xl text-xs sm:text-sm text-gray-700 font-mono">
                    <span className="font-bold text-gray-900">Ruta:</span> {video.file_path || 'Vacía'}
                  </div>*/}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
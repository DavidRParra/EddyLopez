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
  
  // Estado para controlar el video seleccionado en el modal
  const [selectedVideo, setSelectedVideo] = useState<VideoPost | null>(null);

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
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
              Videos y Publicaciones
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 mt-3">
              Aquí podrá ver los vídeos y recursos visuales del Arq. Eddy Lopez.
            </p>
          </div>
        </div>

        {/* Estado de carga */}
        {loading ? (
          <div className="flex justify-center items-center py-28">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
          </div>
        ) : videos.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-md border border-gray-200">
            <p className="text-gray-700 text-xl font-medium">No hay videos registrados en la base de datos.</p>
          </div>
        ) : (
          /* Cuadrícula de videos con tipografía ampliada */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {videos.map((video) => (
              <div 
                key={video.id} 
                className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden flex flex-col transition hover:shadow-xl"
              >
                {/* Contenedor del Video en miniatura */}
                <div className="relative w-full aspect-video bg-black group">
                  <video 
                    preload="metadata"
                    className="w-full h-full object-cover"
                    onError={(e) => console.error(`Error al cargar la miniatura: ${video.file_path}`, e)}
                  >
                    <source src={video.file_path} />
                    Tu navegador no soporta la reproducción de video.
                  </video>
                  
                  {/* Capa interactiva para abrir el modal */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => setSelectedVideo(video)}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl text-lg shadow-xl transition transform hover:scale-105 flex items-center gap-2"
                    >
                      <span>▶</span> Reproducir en grande
                    </button>
                  </div>
                </div>

                {/* Contenido de la tarjeta */}
                <div className="p-6 sm:p-8 flex flex-col flex-grow justify-between">
                  <div>
                    <span className="text-base font-bold text-blue-600 mb-2 uppercase tracking-wider block">
                      {video.created_at ? new Date(video.created_at).toLocaleDateString() : 'Reciente'}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                      {video.title}
                    </h2>

                    {/* DEPUBUĞACIÓN VISUAL: Muestra exactamente qué ruta viene de la BD */}
                    <div className="bg-gray-50 border border-gray-200 p-3 rounded-xl text-xs sm:text-sm text-gray-700 font-mono mb-4 break-all">
                      <span className="font-bold text-gray-900">Ruta en BD:</span> {video.file_path || 'Vacía'}
                    </div>
                  </div>

                  {/* Botón directo grande */}
                  <button 
                    onClick={() => setSelectedVideo(video)}
                    className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-lg py-3 px-4 rounded-xl transition border border-blue-200 flex items-center justify-center gap-2 mt-2"
                  >
                    <span>▶ Ver y reproducir video</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL PARA REPRODUCIR VIDEO */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden flex flex-col border border-gray-200 animate-in fade-in zoom-in duration-200">
            
            {/* Cabecera del Modal */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gray-50">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 line-clamp-1">
                {selectedVideo.title}
              </h3>
              <button 
                onClick={() => setSelectedVideo(null)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold w-10 h-10 rounded-full flex items-center justify-center text-xl transition"
                aria-label="Cerrar modal"
              >
                ✕
              </button>
            </div>

            {/* Reproductor grande dentro del modal */}
            <div className="relative w-full aspect-video bg-black">
              <video 
                key={selectedVideo.id}
                controls 
                autoPlay
                preload="auto"
                className="w-full h-full object-contain"
                onError={(e) => console.error(`Error al reproducir en modal: ${selectedVideo.file_path}`, e)}
              >
                <source src={selectedVideo.file_path} />
                Tu navegador no soporta la reproducción de video.
              </video>
            </div>

            {/* Pie del modal */}
            <div className="p-6 bg-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-gray-200">
              <span className="text-base text-gray-600 font-medium">
                Publicado el: {selectedVideo.created_at ? new Date(selectedVideo.created_at).toLocaleDateString() : 'Reciente'}
              </span>
              <button 
                onClick={() => setSelectedVideo(null)}
                className="w-full sm:w-auto bg-gray-900 hover:bg-black text-white font-semibold text-lg px-8 py-3 rounded-xl transition shadow-md"
              >
                Cerrar reproductor
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
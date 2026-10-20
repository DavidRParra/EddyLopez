'use client';

import React, { useState, useEffect } from 'react';

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

  const getVideoSrc = (path: string, withThumbnailParam = false) => {
    if (!path) return '';
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return withThumbnailParam ? `${cleanPath}#t=0.001` : cleanPath;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 sm:p-8 lg:p-12">
      {/* Ampliamos el contenedor máximo para que las 4 columnas tengan espacio de sobra */}
      <div className="max-w-[1400px] mx-auto">
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
            <p className="text-gray-700 text-xl font-medium">No hay videos para mostrar.</p>
          </div>
        ) : (
          /* Cuadrícula de 4 columnas optimizada con mejor espacio */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {videos.map((video) => (
              <div 
                key={video.id} 
                className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden flex flex-col transition hover:shadow-xl"
              >
                {/* Contenedor del video en miniatura */}
                <div className="relative w-full aspect-video bg-black group">
                  <video 
                    src={getVideoSrc(video.file_path, true)}
                    preload="metadata"
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                    onError={(e) => console.error(`Error al cargar el video: ${video.file_path}`, e)}
                  >
                    Tu navegador no soporta la reproducción de video.
                  </video>
                  
                  {/* Capa interactiva para abrir el modal */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => setSelectedVideo(video)}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2.5 rounded-xl text-base shadow-xl transition transform hover:scale-105 flex items-center gap-2"
                    >
                      <span>▶</span> Ver grande
                    </button>
                  </div>
                </div>

                {/* Contenido de la tarjeta ajustado para 4 columnas */}
                <div className="p-5 flex flex-col flex-grow justify-between">
                  <div>
                    <span className="text-xs font-bold text-blue-600 mb-2 uppercase tracking-wider block">
                      {video.created_at ? new Date(video.created_at).toLocaleDateString() : 'Reciente'}
                    </span>
                    <h2 className="text-xl font-bold text-gray-900 mb-4 line-clamp-2">
                      {video.title}
                    </h2>
                  </div>

                  {/* Botón directo */}
                  <button 
                    onClick={() => setSelectedVideo(video)}
                    className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-sm py-2.5 px-3 rounded-xl transition border border-blue-200 flex items-center justify-center gap-2 mt-2"
                  >
                    <span>▶ Reproducir video</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal para reproducir video */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full my-auto overflow-hidden flex flex-col border border-gray-200 animate-in fade-in zoom-in duration-200 relative">
            
            {/* Cabecera del modal */}
            <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200 bg-gray-50 gap-4">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 line-clamp-1">
                {selectedVideo.title}
              </h3>
              <button 
                onClick={() => setSelectedVideo(null)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold w-11 h-11 rounded-full flex items-center justify-center text-2xl transition flex-shrink-0 shadow-sm"
                aria-label="Cerrar modal"
              >
                ✕
              </button>
            </div>

            {/* Contenedor del video en modal */}
            <div className="relative w-full bg-black flex items-center justify-center max-h-[60vh] sm:max-h-[70vh]">
              <video 
                key={selectedVideo.id}
                src={getVideoSrc(selectedVideo.file_path, false)}
                controls 
                autoPlay
                playsInline
                preload="auto"
                className="w-auto h-auto max-w-full max-h-[60vh] sm:max-h-[70vh] object-contain mx-auto"
                onError={(e) => console.error(`Error al reproducir en modal: ${selectedVideo.file_path}`, e)}
              >
                Tu navegador no soporta la reproducción de video.
              </video>
            </div>

            {/* Pie del modal */}
            <div className="p-4 sm:p-6 bg-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-gray-200">
              <span className="text-sm sm:text-base text-gray-600 font-medium">
                Publicado el: {selectedVideo.created_at ? new Date(selectedVideo.created_at).toLocaleDateString() : 'Reciente'}
              </span>
              <button 
                onClick={() => setSelectedVideo(null)}
                className="w-full sm:w-auto bg-gray-900 hover:bg-black text-white font-semibold text-base sm:text-lg px-6 py-3 rounded-xl transition shadow-md"
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
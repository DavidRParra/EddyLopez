"use client";

import { useState, useEffect } from "react";
import { FaUpload, FaTrash, FaFilter } from "react-icons/fa";

export default function AdminImagesSection() {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [imageTitle, setImageTitle] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUbicacion, setImageUbicacion] = useState("portafolio");
  const [imageOrden, setImageOrden] = useState<number>(0);

  // Estado para el filtro activo ("todas", "portafolio", "carrusel")
  const [filtroUbicacion, setFiltroUbicacion] = useState("todas");

  const fetchImages = async () => {
    try {
      const res = await fetch("/apis/imagenes");
      const data = await res.json();
      if (res.ok && data.success) {
        setImages(data.images || []);
      }
    } catch (err) {
      console.error("Error al cargar imágenes", err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleUploadImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile || !imageTitle || !imageUbicacion) {
      setError("Por favor completa todos los campos obligatorios.");
      return;
    }

    const formData = new FormData();
    formData.append("title", imageTitle);
    formData.append("file", imageFile);
    formData.append("ubicacion", imageUbicacion);
    // Si es portafolio, mandamos orden 0 por defecto para que no afecte
    formData.append("orden", imageUbicacion === "carrusel" ? String(imageOrden) : "0");
    formData.append("user_id", "1");

    try {
      setLoading(true);
      setError("");
      const res = await fetch("/apis/imagenes", { method: "POST", body: formData });
      const data = await res.json();

      if (res.ok && data.success) {
        setSuccessMsg("Imagen agregada correctamente.");
        setImageTitle("");
        setImageFile(null);
        setImageUbicacion("portafolio");
        setImageOrden(0);
        setIsUploadingImage(false);
        fetchImages();
        setTimeout(() => setSuccessMsg(""), 4000);
      } else {
        setError(data.error || "No se pudo subir la imagen.");
      }
    } catch (err) {
      setError("Error crítico al subir la imagen.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteImage = async (id: number) => {
    if (!confirm("¿Deseas eliminar esta imagen?")) return;
    try {
      const res = await fetch(`/apis/imagenes?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMsg("Imagen eliminada correctamente.");
        fetchImages();
        setTimeout(() => setSuccessMsg(""), 4000);
      } else {
        alert(data.error || "No se pudo eliminar.");
      }
    } catch (err) {
      alert("Error al intentar eliminar.");
    }
  };

  // Filtrar las imágenes según la pestaña seleccionada
  const imagenesFiltradas = images.filter((img) => {
    if (filtroUbicacion === "todas") return true;
    return img.ubicacion === filtroUbicacion;
  });

  return (
    <div className="mt-10">
      {successMsg && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl font-medium">
          {successMsg}
        </div>
      )}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl font-medium">
          {error}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Cabecera del Panel */}
        <div className="px-8 py-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h3 className="text-2xl font-bold text-[#002861]">
            Imágenes publicadas ({images.length})
          </h3>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={() => {
                setIsUploadingImage(true);
                setImageTitle("");
                setImageFile(null);
                setImageUbicacion("portafolio");
                setImageOrden(0);
                setError("");
              }}
              className="bg-[#002861] hover:bg-[#001d47] text-white px-5 py-2.5 rounded-xl font-medium shadow-md transition flex items-center gap-2 text-sm"
            >
              <FaUpload /> Agregar Imagen
            </button>
          </div>
        </div>

        {/* Barra de Filtros / Pestañas de Ubicación */}
        <div className="px-8 py-4 bg-gray-50 border-b border-gray-200 flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5 mr-2">
            <FaFilter /> Filtrar por:
          </span>
          <button
            onClick={() => setFiltroUbicacion("todas")}
            className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition ${
              filtroUbicacion === "todas"
                ? "bg-[#002861] text-white shadow-sm"
                : "bg-white text-gray-600 hover:bg-gray-200 border border-gray-200"
            }`}
          >
            Todas ({images.length})
          </button>
          <button
            onClick={() => setFiltroUbicacion("portafolio")}
            className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition ${
              filtroUbicacion === "portafolio"
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-white text-gray-600 hover:bg-gray-200 border border-gray-200"
            }`}
          >
            Portafolio ({images.filter((i) => i.ubicacion === "portafolio").length})
          </button>
          <button
            onClick={() => setFiltroUbicacion("carrusel")}
            className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition ${
              filtroUbicacion === "carrusel"
                ? "bg-purple-600 text-white shadow-sm"
                : "bg-white text-gray-600 hover:bg-gray-200 border border-gray-200"
            }`}
          >
            Carrusel ({images.filter((i) => i.ubicacion === "carrusel").length})
          </button>
        </div>

        {/* Tabla de Resultados */}
        <div className="max-h-120 overflow-y-auto overflow-x-auto">
          <table className="w-full text-left border-collapse relative">
            <thead className="sticky top-0 bg-gray-100 z-10">
              <tr className="text-gray-700 text-sm font-extrabold uppercase tracking-wider border-b border-gray-200">
                <th className="py-5 px-8">Vista Previa</th>
                <th className="py-5 px-8">Título</th>
                <th className="py-5 px-8">Ubicación</th>
                <th className="py-5 px-8">Orden</th>
                <th className="py-5 px-8">Archivo</th>
                <th className="py-5 px-8">Tamaño</th>
                <th className="py-5 px-8 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-base bg-white">
              {imagenesFiltradas.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-gray-500 text-lg font-medium">
                    No hay imágenes registradas en esta categoría.
                  </td>
                </tr>
              ) : (
                imagenesFiltradas.map((img) => (
                  <tr key={img.id} className="hover:bg-gray-50 transition">
                    <td className="py-4 px-8">
                      <img
                        src={img.file_path}
                        alt={img.title}
                        className="w-20 h-12 object-cover rounded-lg border shadow-sm"
                      />
                    </td>
                    <td className="py-5 px-8 font-bold text-gray-900 text-lg">{img.title}</td>
                    <td className="py-5 px-8">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                          img.ubicacion === "carrusel"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {img.ubicacion}
                      </span>
                    </td>
                    <td className="py-5 px-8 font-semibold text-gray-700">
                      <span className="bg-gray-100 px-3 py-1 rounded-md border border-gray-200 text-sm">
                        {img.ubicacion === "carrusel" ? (img.orden ?? 0) : "N/A"}
                      </span>
                    </td>
                    <td className="py-5 px-8 text-gray-600 font-mono text-sm">{img.file_name}</td>
                    <td className="py-5 px-8 text-gray-700 font-semibold">
                      {(img.file_size / (1024 * 1024)).toFixed(2)} MB
                    </td>
                    <td className="py-5 px-8 text-center">
                      <button
                        onClick={() => handleDeleteImage(img.id)}
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

      {/* Modal para subir imagen */}
      {isUploadingImage && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 relative">
            <h3 className="text-xl font-bold text-[#002861] mb-4">Subir Nueva Imagen</h3>
            <form onSubmit={handleUploadImage} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Título / Descripción</label>
                <input
                  type="text"
                  required
                  value={imageTitle}
                  onChange={(e) => setImageTitle(e.target.value)}
                  placeholder="Ej. Banner Principal"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#002861]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ubicación</label>
                <select
                  value={imageUbicacion}
                  onChange={(e) => {
                    setImageUbicacion(e.target.value);
                    if (e.target.value === "portafolio") setImageOrden(0);
                  }}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#002861] bg-white"
                >
                  <option value="portafolio">Portafolio</option>
                  <option value="carrusel">Carrusel</option>
                </select>
              </div>

              {/* El campo de orden solo se muestra si la ubicación es Carrusel */}
              {imageUbicacion === "carrusel" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Orden de Visualización</label>
                  <input
                    type="number"
                    value={imageOrden}
                    onChange={(e) => setImageOrden(Number(e.target.value))}
                    min={0}
                    placeholder="Ej. 1, 2, 3..."
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#002861]"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Archivo de Imagen</label>
                <input
                  type="file"
                  accept="image/*"
                  required
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm file:bg-[#002861] file:text-white file:rounded-lg file:border-0 file:py-2 file:px-4"
                />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsUploadingImage(false)}
                  className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100 font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 bg-[#002861] text-white rounded-lg hover:bg-[#001d47] font-medium shadow disabled:opacity-50"
                >
                  {loading ? "Guardando..." : "Subir Imagen"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
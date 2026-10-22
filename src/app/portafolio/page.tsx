'use client';

import { useState, useEffect } from "react";
import { FaFile } from "react-icons/fa";
import Link from "next/link";
import ModalImage from "@/components/modals/modal-image";
import FadeIn from "@/components/ScaleIn";

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalUrl, setModalUrl] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  const [portafolioImages, setPortafolioImages] = useState<any[]>([]);

  useEffect(() => {
    const fetchPortafolioImages = async () => {
      try {
        const res = await fetch("/apis/imagenes?ubicacion=portafolio");
        const data = await res.json();
        if (res.ok && data.success) {
          setPortafolioImages(data.images || []);
        }
      } catch (err) {
        console.error("Error al cargar las imágenes del portafolio", err);
      }
    };

    fetchPortafolioImages();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <main className="w-full min-h-screen px-4 py-8 sm:px-6 md:px-8 lg:px-10 xl:px-12">
      
      {/* GRID */}
      <div
        className="
          mx-auto
          w-full
          max-w-[1400px]

          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3

          gap-5
          sm:gap-6
          lg:gap-7
        "
      >
        {portafolioImages.length === 0 ? (
          <div className="col-span-full text-center py-20 text-gray-500 text-lg">
            Cargando imágenes del portafolio o no hay registros disponibles...
          </div>
        ) : (
          portafolioImages.map((img) => (
            <article
              key={img.id}
              onClick={() => {
                setModalUrl(img.file_path);
                setModalTitle(img.title);
                openModal();
              }}
              className="
                group
                w-full
                overflow-hidden
                rounded-xl
                bg-white
                border
                border-gray-200
                shadow-sm
                cursor-pointer

                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-xl
              "
            >
              {/* IMAGEN (Cambiado a etiqueta <img> estándar para que Nginx la sirva sin problemas) */}
              <div
                className="
                  relative
                  w-full
                  aspect-[16/10]
                  overflow-hidden
                  bg-gray-100
                "
              >
                <img
                  src={img.file_path}
                  alt={img.title || "Imagen del portafolio"}
                  className="
                    w-full
                    h-full
                    object-cover
                    transition-transform
                    duration-500
                    group-hover:scale-105
                  "
                />
              </div>

              {/* TEXTO */}
              <div
                className="
                  px-3
                  py-3
                  sm:px-4
                  sm:py-4
                  text-center
                "
              >
                <p
                  className="
                    text-sm
                    sm:text-base
                    lg:text-lg
                    font-semibold
                    leading-tight
                    text-[#002861]
                  "
                >
                  {img.title}
                </p>
              </div>
            </article>
          ))
        )}

        {/* MODAL */}
        <ModalImage
          isOpen={isModalOpen}
          onClose={closeModal}
        >
          <div
            className="
              relative
              flex
              min-h-full
              w-full
              items-center
              justify-center
              px-3
              sm:px-6
              py-6
            "
          >
            <FadeIn>
              <div
                className="
                  relative
                  flex
                  max-h-[85vh]
                  max-w-[95vw]
                  items-center
                  justify-center
                "
              >
                <img
                  src={modalUrl}
                  alt={modalTitle || "Vista ampliada"}
                  className="
                    max-h-[80vh]
                    max-w-full
                    w-auto
                    rounded-xl
                    object-contain
                    border
                    border-black
                  "
                />
              </div>

              <Link
                href="#"
                target="_blank"
                className="group"
              >
                <div
                  className="
                    fixed
                    bottom-4
                    right-4

                    sm:bottom-6
                    sm:right-6

                    md:bottom-8
                    md:right-8

                    flex
                    h-12
                    w-12
                    sm:h-14
                    sm:w-14
                    md:h-16
                    md:w-16

                    items-center
                    justify-center

                    rounded-full
                    bg-white/95
                    shadow-2xl
                    backdrop-blur-md

                    transition-all
                    duration-300

                    hover:w-40
                    sm:hover:w-48
                  "
                >
                  <FaFile
                    className="
                      h-5
                      w-5
                      sm:h-6
                      sm:w-6
                      md:h-7
                      md:w-7
                      shrink-0
                      text-[#002861]
                    "
                  />

                  <span
                    className="
                      hidden
                      overflow-hidden
                      whitespace-nowrap

                      text-sm
                      sm:text-base
                      md:text-lg

                      font-semibold
                      text-[#002861]

                      group-hover:block
                      ml-2
                    "
                  >
                    Ver más
                  </span>
                </div>
              </Link>
            </FadeIn>
          </div>
        </ModalImage>
      </div>
    </main>
  );
}
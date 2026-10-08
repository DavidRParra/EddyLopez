"use client";

import Image from "next/image";
import { useState } from "react";
import { FaFile } from "react-icons/fa";
import Link from "next/link";
import ModalImage from "@/components/modals/modal-image";
import FadeIn from "@/components/ScaleIn";

const ImageUrls = [
  "/Portafolio1.jpg",
  "/Portafolio2.png",
  "/Portafolio3.jpg",
  "/Portafolio4.jpg",
  "/Portafolio5.jpg",
  "/Slider1.jpg",
  "/Portafolio7.jpg",
  "/Portafolio8.png",
  "/Portafolio9.jpg",
  "/Portafolio10.jpg",
  "/Portafolio11.png",
  "/Slider8.png",
];

const ImageRecurso = [
  "#",
  "#",
  "#",
  "#",
  "#",
  "#",
  "#",
  "#",
  "#",
  "#",
  "#",
  "/Video1.mp4",
];

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalUrl, setModalUrl] = useState("");
  const [modalRecurso, setModalRecurso] = useState(0);

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
        {ImageUrls.map((url, index) => (
          <article
            key={index}
            onClick={() => {
              setModalUrl(url);
              setModalRecurso(index);
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
            {/* IMAGEN */}
            <div
              className="
                relative
                w-full
                aspect-[16/10]
                overflow-hidden
                bg-gray-100
              "
            >
              <Image
                src={url}
                alt={`Proyecto ${index + 1}`}
                fill
                sizes="
                  (max-width: 640px) 100vw,
                  (max-width: 1024px) 50vw,
                  33vw
                "
                className="
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
                Imágenes del Proyecto Terminado
              </p>
            </div>
          </article>
        ))}

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
                <Image
                  src={modalUrl}
                  alt="Vista ampliada del proyecto"
                  width={1600}
                  height={1000}
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

              {/* BOTÓN VER MÁS */}
              <Link
                href={ImageRecurso[modalRecurso]}
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
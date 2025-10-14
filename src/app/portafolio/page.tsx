"use client";
import Image from "next/image";
import { use, useState } from "react";
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
  "/Slider8.png"

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
  "/PlanosVillaBeato.pdf",
  "/Video1.mp4"
];

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalUrl, setModalUrl] = useState("");
  const [modalRecurso, setModalRecurso] = useState(0);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex flex-col justify-center w-full mb-[2rem]">
      <div className="grid grid-cols-3 justify-center items-center w-full h-full px-40">

        {
        ImageUrls.map((url, index) => (
          <div className="flex flex-col" key={index}>
            <Image
              onClick={() => (
                openModal(),
                setModalUrl(url),
                setModalRecurso(index)
              )
              }
              key={index}
              src={url}
              alt={`Image ${index + 1}`}
              width={800}
              height={600}
              className="mx-auto my-4 w-[55rem] h-[30rem] rounded-2xl border border-black hover:scale-105 transition-transform duration-300 object-cover"
            />

            <div className="text-center text-[2.1rem] font-semibold">
              <p>Planos de Proyecto Terminado</p>
            </div>

            

          </div>
        ))
        }
        <ModalImage isOpen={isModalOpen} onClose={closeModal}>
          <div>
            <FadeIn>
              <Image
                src={modalUrl}
                alt={'Image' }
                width={1200}
                height={900}
                className="mx-auto my-4 w-[120rem] h-[70rem] rounded-2xl border border-black object-cover"
              />
              

                <Link 
                  href={ImageRecurso[modalRecurso]} 
                  target="_blank"
                  className="group"
                  >
                    <div className="text-center font-semibold bg-white/50 w-[7rem] h-[7rem] fixed bottom-10 right-10 rounded-full flex items-center justify-center group-hover:w-[21rem] transition-all duration-400 hover:shadow-lg hover:shadow-black/40 hover:bg-white/80">
                      <FaFile className=" w-[3rem] h-[3rem] text-black " />
                      <p className="text-[2.3rem] min-w-[15rem] hidden group-hover:inline transition-all duration-700">Ver mas</p>
                    </div>
                  </Link>

              
            </FadeIn>
          </div>
        </ModalImage>

      </div>
    </div>
  );
}
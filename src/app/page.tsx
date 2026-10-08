'use client';
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaChevronDown, FaSearch } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 5000,
    autoplay: true,
    cssEase: "linear"
  };

  return (
    <div className="mt-3 overflow-x-hidden">
      <div className="flex flex-col items-center max-w-[100vw] mx-auto justify-center px-4 md:px-0">
        
        {/* CARRUSEL RESPONSIVE */}
        <div className="w-[92vw] md:w-[75vw] my-4">
          <Slider {...settings} className="w-full">
            <div className="w-full h-[30vh] sm:h-[50vh] md:h-[80vh]">
              <Image src="/Slider10.png" alt="Imagen fondo" width={1500} height={1000} className="w-full h-full object-cover rounded-lg" />
            </div>
            <div className="w-full h-[30vh] sm:h-[50vh] md:h-[80vh]">
              <Image src="/Slider11.png" alt="Imagen fondo" width={1500} height={1000} className="w-full h-full object-cover rounded-lg" />
            </div>
            <div className="w-full h-[30vh] sm:h-[50vh] md:h-[80vh]">
              <Image src="/Slider12.png" alt="Imagen fondo" width={1500} height={1000} className="w-full h-full object-cover rounded-lg" />
            </div>
            <div className="w-full h-[30vh] sm:h-[50vh] md:h-[80vh]">
              <Image src="/Slider13.jpeg" alt="Imagen fondo" width={1500} height={1000} className="w-full h-full object-cover rounded-lg" />
            </div>
            <div className="w-full h-[30vh] sm:h-[50vh] md:h-[80vh]">
              <Image src="/Slider14.jpg" alt="Imagen fondo" width={1500} height={1000} className="w-full h-full object-cover rounded-lg" />
            </div>
            <div className="w-full h-[30vh] sm:h-[50vh] md:h-[80vh]">
              <Image src="/Slider15.png" alt="Imagen fondo" width={1000} height={1000} className="w-full h-full object-cover rounded-lg" />
            </div>
            <div className="w-full h-[30vh] sm:h-[50vh] md:h-[80vh]">
              <Image src="/Slider7.jpg" alt="Imagen fondo" width={1000} height={1000} className="w-full h-full object-cover rounded-lg" />
            </div>
            <Link href="https://www.instagram.com/p/DMYxL3WysrM/" target="_blank" className="w-full h-[30vh] sm:h-[50vh] md:h-[80vh] block">
              <Image src="/Slider8.png" alt="Imagen fondo" width={700} height={1500} className="w-full h-full object-cover rounded-lg" />
            </Link>
            <div className="w-full h-[30vh] sm:h-[50vh] md:h-[80vh]">
              <Image src="/Slider9.png" alt="Imagen fondo" width={1000} height={1000} className="w-full h-full object-cover rounded-lg" />
            </div>
          </Slider>
        </div>

        {/* SECCIÓN DE ASESORÍA INMOBILIARIA */}
        <div className="w-[92vw] md:w-[75vw] flex flex-col items-center justify-center rounded-3xl mt-10 mb-15 p-6 md:p-8 bg-[#002861] text-white overflow-visible relative">
          <div className="flex flex-col gap-2 text-center mb-6">
            <h1 className="text-[2.5rem] md:text-[4rem] font-bold leading-tight">Asesoria Inmobiliaria</h1>
            <p className="text-[1.5rem] md:text-[1.8rem] font-semibold text-gray-200">Explora propiedades en Republica Dominicana</p>
          </div>

          <div className="w-full flex justify-center relative">
            <div className="flex flex-col md:flex-row bg-white w-full md:w-[70rem] rounded-2xl md:rounded-full items-center gap-4 justify-center text-[1.6rem] p-4 md:px-6 md:py-3 text-black relative">

              {/* Selector de Ciudad */}
              <div className="relative w-full md:w-[35%] border-b md:border-b-0 md:border-r border-gray-300 pb-2 md:pb-0">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex justify-between items-center w-full p-2 text-left cursor-pointer"
                >
                  <span>Ciudad</span>
                  <FaChevronDown className={`text-[#002861] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                </button>

                {isOpen && (
                  <div className="absolute top-full left-0 mt-2 flex flex-col gap-2 z-50 w-full rounded-xl bg-white shadow-2xl border border-gray-200 p-2">
                    <input 
                      type="text" 
                      placeholder="Buscar ciudad..." 
                      className="w-full px-3 py-1.5 rounded-lg text-[1.4rem] bg-gray-100 border border-gray-300 outline-none" 
                    />
                    <div className="flex flex-col gap-1 max-h-[14rem] overflow-y-auto text-[1.5rem]">
                      <p onClick={() => setIsOpen(false)} className="hover:bg-gray-100 cursor-pointer w-full p-2 rounded-lg">La Vega</p>
                      <p onClick={() => setIsOpen(false)} className="hover:bg-gray-100 cursor-pointer w-full p-2 rounded-lg">Santiago</p>
                      <p onClick={() => setIsOpen(false)} className="hover:bg-gray-100 cursor-pointer w-full p-2 rounded-lg">Puerto Plata</p>
                      <p onClick={() => setIsOpen(false)} className="hover:bg-gray-100 cursor-pointer w-full p-2 rounded-lg">Bavaro</p>
                      <p onClick={() => setIsOpen(false)} className="hover:bg-gray-100 cursor-pointer w-full p-2 rounded-lg">Punta Cana</p>
                      <p onClick={() => setIsOpen(false)} className="hover:bg-gray-100 cursor-pointer w-full p-2 rounded-lg">Santo Domingo</p>
                      <p onClick={() => setIsOpen(false)} className="hover:bg-gray-100 cursor-pointer w-full p-2 rounded-lg">Moca</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Barra de Búsqueda de Inmuebles */}
              <div className="flex flex-col md:flex-row items-center w-full gap-3">
                <div className="flex relative w-full items-center">
                  <div className="absolute left-3 text-gray-500">
                    <FaSearch className={inputValue ? 'text-black' : 'text-gray-500'} />
                  </div>
                  <input 
                    type="text" 
                    value={inputValue} 
                    onChange={(e) => setInputValue(e.target.value)} 
                    placeholder="Inmueble" 
                    className="pl-10 pr-4 py-2 w-full text-[1.5rem] outline-none" 
                  />
                </div>

                <button className="w-full md:w-auto bg-[#002861] text-white px-6 py-2 rounded-xl md:rounded-full font-semibold hover:bg-[#001d44] transition-colors cursor-pointer">
                  Buscar
                </button>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
'use client';
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {FaChevronDown, FaSearch} from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Home() {

  const [isOpen, setIsOpen] = useState(false)
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
    <div className="mt-3">

      {/*<div 
      className=" z-[-1] h-[100vh] bg-cover bg-center bg-black/25 bg-blend-overlay flex  flex-col items-center justify-center lg:justify-en" 
      style={{backgroundImage : `url('/eddylopez9.jpg')`}}>

        
        <h1 className="text-white !text-[4rem] font-bold">Especialistas en proyectos arquitectónicos a medida</h1>
        

        <p className="text-white text-[2rem] my-3">Explora algunos de nuestros proyectos</p>

        

    

      </div>
*/}
      <div className="flex flex-col items-center  max-w-[100vw] mx-[auto] justify-center">
        

        <Slider {...settings} className="flex w-[90vw] h-[80vh]">
          <div className="felx w-[100%] h-[80vh] ">
            <Image src="/Slider5.jpg" alt="Imagen fondo" width={1500} height={1000}  className="w-full h-full rounded-lg"/>
          </div>

          <div className="felx w-[100%] h-[80vh] ">
            <Image src="/Slider1.jpg" alt="Imagen fondo" width={1500} height={1000}  className="w-full h-full rounded-lg"/>
          </div>

          <div className="felx w-[100%] h-[80vh] ">
            <Image src="/Slider2.jpg" alt="Imagen fondo" width={1500} height={1000}  className="w-full h-full rounded-lg"/>
          </div>

          <div className="felx w-[100%] h-[80vh] ">
            <Image src="/Slider3.jpg" alt="Imagen fondo" width={1500} height={1000}  className="w-full h-full rounded-lg"/>
          </div>

          <div className="felx w-[100%] h-[80vh] ">
            <Image src="/Slider4.jpg" alt="Imagen fondo" width={1500} height={1000}  className="w-full h-full rounded-lg"/>
          </div>

          <div className="felx w-[100%] h-[80vh]">
            <Image src="/Slider6.jpg" alt="Imagen fondo" width={1000} height={1000} className="w-full h-full rounded-lg"/>
          </div>

          <div className="felx w-[100%] h-[80vh] object-cover">
            <Image src="/Slider7.jpg" alt="Imagen fondo" width={1000} height={1000} className="w-full h-full rounded-lg"/>
          </div>
          
          <Link href="https://www.instagram.com/p/DMYxL3WysrM/" target="_blank" className="felx w-full h-[80vh] object-cover">
            <Image src="/Slider8.png" alt="Imagen fondo" width={700} height={1500} className="w-full h-full rounded-lg"/>
          </Link>

          <div className="felx w-[100%] h-[80vh] object-cover">
            <Image src="/Slider9.png" alt="Imagen fondo" width={1000} height={1000} className="w-full h-full rounded-lg"/>
          </div>

          
        </Slider>


        <div className="absolute flex flex-col items-center justify-center bg-white/0  rounded-lg mt-[30%] w-[70%]">
          <div className="flex flex-col gap-0  text-[#2200b8] text-center">
            <h1 className="!text-[4rem] !my-0">Asesoria Inmobiliaria</h1>
            <p className="text-[1.8rem] font-semibold">Explora propiedades en Republica Dominicana</p>
          </div>
          <div className="flex w-full my-2">
            <div className=" relative w-full flex items-end justify-end">
              <div className="flex w-[50%] bg-white rounded-full items-start gap-5 justify-center mx-[auto] text-[1.8rem] px-6">

                <div className="relative w-[35%]">

                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className=" flex justify-between w-full   p-2 text-left">
                    Ciudad

                    {isOpen && (
                      <FaChevronDown className="rotate-180 text-[#2200b8]"/>

                    ) || (
                      <FaChevronDown className="text-[#2200b8]"/>
                    )}
                    
                  </button>

                  {isOpen && (
                    <div className="absolute bottom-15 flex flex-col gap-4 z-10 w-full rounded-t-lg mt-1 bg-white shadow-lg p-[.5rem]">
                      <input type="text" className="w-full  px-3 rounded-lg text-[3rem] p-1"/>
                      <div className=" flex justify-center gap-2 w-full">
                        <button className="w-[100%] border rounded-lg px-2 cursor-pointer hover:bg-gray-100">Todo</button>
                        <button className="w-[100%] border rounded-lg px-2 cursor-pointer hover:bg-gray-100">Desmarcar</button>
                      </div>

                      <div className="flex flex-col gap-6 scroll-auto h-[12rem] overflow-y-scroll">
                        <p className="hover:bg-gray-100 cursor-pointer w-full p-2">La Vega</p>

                        <p className="hover:bg-gray-100 cursor-pointer w-full p-2">Santiago</p>

                        <p className="hover:bg-gray-100 cursor-pointer w-full p-2">Puerto Plata</p>

                        <p className="hover:bg-gray-100 cursor-pointer w-full p-2">Bavaro</p>

                        <p className="hover:bg-gray-100 cursor-pointer w-full p-2">Punta Cana</p>

                        <p className="hover:bg-gray-100 cursor-pointer w-full p-2">Santo Domingo</p>

                        <p className="hover:bg-gray-100 cursor-pointer w-full p-2">Moca</p>
                        
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center w-full gap-2">
                  <div className="flex relative  w-full items-center">
                      <div className="absolute left-2">
                        <FaSearch className={inputValue ? 'text-black' : 'text-gray-500'}/>
                      </div>
                    
                    
                    <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Inmueble" className=" pl-12 p-2 w-full"/>
                  </div>
                  

                  <button className=" p-2 ">

                    Buscar
                  </button>

                </div>

              </div>

            </div>
          </div>
        </div>
        
      </div>

      


    </div>
  );
}

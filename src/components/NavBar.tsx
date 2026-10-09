'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaMapMarked, FaPhone, FaTimes, FaBars } from "react-icons/fa";

function NavBar() {
    const [isOpen, setIsOpen] = useState(false);

    return(
        <div className="flex justify-between md:justify-evenly items-center w-full mx-[auto] bg-[#FFFFFF] text-[1.8rem] p-3 text-black relative border-[#002861] shadow-md z-40">

            <Link href="/" className="relative flex justify-center gap-4 items-center text-[2.5rem]">
                {/* Contenedor con group para activar el hover */}
                <div className="relative group flex items-center">
                    <Image src="/LOGO.png" alt="Eddy Lopez Profile" width={900} height={500} className="w-[18rem] md:w-[28rem] h-auto object-contain"></Image>
                    
                    {/* Tarjeta desplegable al hacer hover sobre el logo */}
                    <div className="absolute top-full left-0 mt-2 w-[38rem] flex-col bg-white rounded-3xl p-8 shadow-2xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out z-50 pointer-events-none group-hover:pointer-events-auto hidden md:flex">
                        <div
                            style={{backgroundImage : "url('/Eddy-Lopez-new.jpeg')"}}
                            className="w-[18rem] h-[18rem] rounded-full bg-no-repeat bg-cover bg-center mx-auto shadow-inner border-2 border-gray-100"
                        />
                        <p className="mt-5 text-center text-[#002861] text-[1.2rem] leading-relaxed font-medium">
                            Con una trayectoria de más de tres décadas en el sector inmobiliario, el arquitecto Eddy López se ha consolidado como un referente por su profesionalismo, visión estratégica y compromiso inquebrantable con la excelencia.
                        </p>
                    </div>
                </div>

                <div className="hidden lg:flex absolute gap-3 font-bold rounded-lg z-30 bottom-0 right-0 text-[#002861]">
                    <p className="flex items-center text-[1.2rem] w-full ">
                        <FaPhone className="rotate-90 text-black"/>
                        (809) 573-7056
                    </p>
                    <p className="flex items-center text-[1.2rem] w-full rounded-b-lg">
                        <FaPhone className="rotate-90 text-black"/>
                        (809) 399-8344
                    </p>
                </div>
            </Link>

            {/* BOTÓN DE MENÚ HAMBURGUESA (MÓVIL) */}
            <div className="flex lg:hidden">
                <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-[2.2rem] text-black focus:outline-none bg-gray-100 rounded-lg border border-[#002861]">
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* NAVEGACIÓN PRINCIPAL (OCULTA EN MÓVIL HASTA ABRIR) */}
            <nav className={`${isOpen ? 'flex' : 'hidden'} lg:flex flex-col lg:flex-row items-center gap-6 absolute lg:relative top-full left-0 w-full lg:w-auto bg-white lg:bg-transparent p-6 lg:p-0 shadow-xl lg:shadow-none border-b lg:border-none border-gray-200 z-50`}>
                <ul className="flex flex-col lg:flex-row font-semibold gap-3 lg:gap-2 w-full lg:w-auto items-center">
                    <Link 
                        href="/" 
                        onClick={() => setIsOpen(false)}
                        className="text-white !bg-[#002861] rounded-4xl px-5 py-2 border border-transparent hover:!bg-white hover:text-[#002861] hover:border-[#002861] w-full lg:w-auto text-center"
                    >
                        Inicio
                    </Link>

                    <li className="relative group w-full lg:w-auto text-center">
                        <Link href="#" className="flex items-center justify-center gap-3 border border-transparent text-white !bg-[#002861] py-2 rounded-4xl px-4 group-hover:!bg-white group-hover:text-[#002861] group-hover:border-[#002861]">
                            Inmuebles
                        </Link>
                    </li>

                    <Link href="/portafolio" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-3 border border-transparent text-white !bg-[#002861] py-2 rounded-4xl px-4 hover:!bg-white hover:text-[#002861] hover:border-[#002861] w-full lg:w-auto">Portafolio</Link>

                    <Link href="/nosotros" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-3 border border-transparent text-white !bg-[#002861] py-2 rounded-4xl px-4 hover:!bg-white hover:text-[#002861] hover:border-[#002861] w-full lg:w-auto">Nosotros</Link>

                    <Link href="/contacto" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-3 border border-transparent text-white !bg-[#002861] py-2 rounded-4xl px-4 hover:!bg-white hover:text-[#002861] hover:border-[#002861] w-full lg:w-auto">Contactanos</Link>

                    <Link href="/videos" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-3 border border-transparent text-white !bg-[#002861] py-2 rounded-4xl px-4 hover:!bg-white hover:text-[#002861] hover:border-[#002861] w-full lg:w-auto">Publicaciones</Link>
                </ul>
            </nav>

            {/* BOTÓN DE LOCALIZACIÓN (DESKTOP) */}
            <div className="hidden lg:flex items-center gap-[4rem]">
                <div className="flex gap-5 items-center">
                    <Link 
                        href="https://maps.app.goo.gl/Y9YdZwmTHiEDUW2C8"
                        className="flex items-center gap-4 border border-transparent text-[1.6rem] text-white !bg-[#002861] px-4 py-2 rounded-full hover:!bg-white hover:!text-[#002861] hover:!border-[#002861] transition-colors duration-300"
                        target="_blank"
                    >
                        <div>
                            <FaMapMarked/>
                        </div>
                        <span>Localizacion</span>
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default NavBar;
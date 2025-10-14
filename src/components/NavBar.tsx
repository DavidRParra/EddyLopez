'use client';


import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {FaChevronDown, FaMapMarked, FaPhone} from "react-icons/fa";



function NavBar(){
    const [isOpen, setIsOpen] = useState(false)
    


    return(
        <div className="flex justify-evenly items-center w-full mx-[auto] bg-[#FFFFFF] text-[1.8rem] p-3 text-Black relative border-[#2200b8]">

            <Link href="/" className="relative flex justify-center gap-4 items-center text-[2.5rem]">

                {/* Descripcion de Eddy Lopez */}
                <div className="flex group">
                    <Image src="/LOGO.png" alt="Eddy Lopez Profile" width={900} height={500} className="w-[28rem] h-[8rem]  group"></Image>
                    <div className="w-[70rem] absolute flex flex-col top-40 left-0 scale-0 group-hover:block group-hover:scale-100 z-30 bg-[#ffd500] rounded-4xl px-[6rem] py-[3rem]">
                        <div
                            style={{backgroundImage : "url('/EddyLopezProfile.jpg')"}}
                            className="w-[35rem] h-[35rem] rounded-full bg-no-repeat bg-cover mx-auto"
                        />

                        <p className="mt-[2rem] text-center"></p>
                    </div>
                </div>

                <div className="absolute flex gap-3 font-bold rounded-lg z-30 bottom-0 right-0 text-[#002861]">
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

            <nav className="flex items-center gap-6">
                <ul className="flex font-semibold gap-2">
                    <Link 
                        href="/" 
                        className=" text-white !bg-[#2200b8] rounded-4xl px-5 py-2 border border-transparent hover:!bg-white hover:text-[#2200b8] hover:border-[#2200b8]"
                    >
                        Inicio
                    </Link>

                    <span className="w-[.2rem] bg-black"/>

                    <li className="relative group">
                        <Link href="#" className="flex items-center gap-3 border border-transparent text-white !bg-[#2200b8] py-2 rounded-4xl px-4  group-hover:!bg-white group-hover:text-[#2200b8] group-hover:border-[#2200b8]">
                            Inmuebles
                            <FaChevronDown className="hidden h-[2rem] w-[2rem] transform group-hover:rotate-180 transition-transform duration-450 lg:block" />
                        </Link>

                        <ul className="lg:absolute lg:hidden group-hover:block bg-gray-100 left-0 top-12 rounded-lg z-10">
                            <Link href="#" ><li className="hover:bg-[#2200b8] hover:text-[#ffffff] px-4 py-2 rounded-lg">Casas</li></Link>
                            <Link href="#" ><li className="hover:bg-[#2200b8] hover:text-[#ffffff] px-4 py-2 rounded-lg">Apartamentos</li></Link>
                            <Link href="#" ><li className="hover:bg-[#2200b8] hover:text-[#ffffff] px-4 py-2 rounded-lg">Edificios</li></Link>
                            <Link href="#" ><li className="hover:bg-[#2200b8] hover:text-[#ffffff] px-4 py-2 rounded-lg">Solares</li></Link>
                            <Link href="#" ><li className="hover:bg-[#2200b8] hover:text-[#ffffff] px-4 py-2 rounded-lg">Fincas</li></Link>

                        </ul>
                    </li>

                    <span className="w-[.2rem] bg-black"/>

                    <Link href="/portafolio" className="flex items-center gap-3 border border-transparent text-white !bg-[#2200b8] py-2 rounded-4xl px-4 hover:!bg-white hover:text-[#2200b8] hover:border-[#2200b8]">Portafolio</Link>

                    <span className="w-[.2rem] bg-black"/>

                    <Link href="/nosotros" className="flex items-center gap-3 border border-transparent text-white !bg-[#2200b8] py-2 rounded-4xl px-4 hover:!bg-white hover:text-[#2200b8] hover:border-[#2200b8]">Nosotros</Link>

                    <span className="w-[.2rem] bg-black"/>

                    <Link href="/nuestro_equipo" className="flex items-center gap-3 border border-transparent text-white !bg-[#2200b8] py-2 rounded-4xl px-4 hover:!bg-white hover:text-[#2200b8] hover:border-[#2200b8]">Nuestro Equipo</Link>

                    <span className="w-[.2rem] bg-black"/>

                    <Link href="/contacto" className="flex items-center gap-3  border border-transparent text-white !bg-[#2200b8] py-2 rounded-4xl px-4 hover:!bg-white hover:text-[#2200b8] hover:border-[#2200b8]">Contactanos</Link>
                </ul>
            </nav>


            <div className="flex items-center gap-[4rem]">
                

                <div className="flex gap-5 items-center">
                    <Link 
                        href="https://maps.app.goo.gl/Y9YdZwmTHiEDUW2C8"
                        className="flex items-center gap-4 border border-transparent text-[1.6rem] text-white !bg-[#2200b8]  px-4 py-2 rounded-[1rem] hover:!bg-white hover:!text-[#2200b8] hover:!border-[#2200b8] transition-colors duration-300"
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
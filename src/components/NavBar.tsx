'use client';


import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {FaChevronDown, FaMapMarked, FaPhone} from "react-icons/fa";

function NavBar(){
    const [isOpen, setIsOpen] = useState(false)
    


    return(
        <div className="flex justify-evenly items-center w-full mx-[auto] bg-[#FFFFFF] text-[1.8rem] p-3 text-Black relative border-b border-[#2200b8]">

            <Link href="/" className="flex justify-center gap-4 items-center text-[2.5rem]">
                <div className="flex group">
                    <Image src="/EddyLopezProfile.jpg" alt="Eddy Lopez Profile" width={500} height={500} className="w-[5rem] rounded-full group"></Image>
                    <Image 
                        src="/Logo_Info.jpg" 
                        alt="Eddy Lopez Profile" 
                        width={500} 
                        height={500} 
                        className="w-[35rem] absolute top-40 left-0 scale-0 group-hover:block group-hover:scale-100 z-30"></Image>
                </div>

                <h2 className="font-bold">ARQ. EDDY LOPEZ</h2>
            </Link>

            <nav className="flex items-center gap-6">
                <ul className="flex font-semibold gap-2">
                    <Link 
                        href="/" 
                        className=" text-white !bg-[#2200b8] rounded-4xl px-5 py-2 "
                    >
                        Inicio
                    </Link>

                    <span className="w-[.2rem] bg-black"/>

                    <li className="relative group">
                        <Link href="#" className="flex items-center gap-3 text-white !bg-[#2200b8] py-2 rounded-4xl px-4">
                        Inmuebles
                        <FaChevronDown className="hidden h-[2rem] w-[2rem] transform group-hover:rotate-180 transition-transform duration-450 lg:block" />
                        </Link>

                        <ul className="lg:absolute lg:hidden group-hover:block bg-gray-100 left-0 top-12 rounded-lg z-10">
                            <Link href="#" ><li className="hover:bg-[#2200b8] hover:text-[#ffffff] px-4 py-2 rounded-lg">Casas</li></Link>
                            <Link href="#" ><li className="hover:bg-[#2200b8] hover:text-[#ffffff] px-4 py-2 rounded-lg">Apartamentos</li></Link>
                            <Link href="#" ><li className="hover:bg-[#2200b8] hover:text-[#ffffff] px-4 py-2 rounded-lg">Edificios</li></Link>
                            {/*<Link href="#" ><li className="hover:bg-[#75512f] hover:text-[#ffffff] px-4 py-2 rounded-lg">Turistico</li></Link>*/}
                            <Link href="#" ><li className="hover:bg-[#2200b8] hover:text-[#ffffff] px-4 py-2 rounded-lg">Solares</li></Link>
                            <Link href="#" ><li className="hover:bg-[#2200b8] hover:text-[#ffffff] px-4 py-2 rounded-lg">Fincas</li></Link>

                        </ul>
                    </li>

                    <span className="w-[.2rem] bg-black"/>

                    <Link href="/nosotros" className="flex items-center gap-3 text-white !bg-[#2200b8] py-2 rounded-4xl px-4">Nosotros</Link>

                    <span className="w-[.2rem] bg-black"/>

                    <Link href="/contacto" className="flex items-center gap-3 text-white !bg-[#2200b8] py-2 rounded-4xl px-4">Contactanos</Link>
                </ul>
            </nav>

            

            <div className="flex items-center gap-[4rem]">
                <div className="flex gap-3  border border-[#2200b8] rounded-lg ">
                    <p className="flex items-center text-[1.2rem] p-2 gap-2 w-full rounded-t-lg">
                        <FaPhone className="rotate-90"/>
                        (809) 573-7056
                    </p>

                    <p className="flex items-center text-[1.2rem] p-2 gap-2 w-full rounded-b-lg">
                        <FaPhone className="rotate-90"/>
                        (809) 399-8344
                    </p>
                </div>

                <div className="flex gap-5 items-center">
                    <Link 
                        href="https://maps.app.goo.gl/rrWnhd7CMWDtmSow8"
                        className="flex items-center gap-4 border border-transparent text-[1.6rem] text-white !bg-[#2200b8]  px-4 py-2 rounded-[1rem] hover:!bg-white hover:!text-[#2200b8] hover:!border-[#2200b8] transition-colors duration-300"
                        target="_blank"
                    >
                        <div>
                            <FaMapMarked/>
                        </div>

                        <span>Localizacion: La Vega</span>

                    </Link>
                    <p className="flex flex-col text-[1.2rem]  border border-[#2200b8] p-2 rounded-lg">
                        <span>Av. Imbert esq. Pedro J. Casado No. 94,</span> 
                        <span>La Vega, Republica Dominicana </span>
                    </p>
                </div>
            </div>

            

        </div>
    )
}

export default NavBar;
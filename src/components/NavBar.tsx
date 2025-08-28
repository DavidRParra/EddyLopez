'use client';


import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {FaChevronDown, FaMapMarked} from "react-icons/fa";

function NavBar(){
    const [isOpen, setIsOpen] = useState(false)
    


    return(
        <div className="flex justify-evenly items-center w-full mx-[auto] bg-[#FFFFFF] text-[1.8rem] p-3 text-Black relative border-b border-amber-700">

            <Link href="/" className="flex justify-center gap-4 items-center text-[2.5rem]">
                <Image src="/EddyLopezProfile.jpg" alt="Eddy Lopez Profile" width={500} height={500} className="w-[5rem] rounded-full"></Image>
                <h2 className="font-bold">ARQ. EDDY LOPEZ</h2>
            </Link>

            <nav className="flex items-center gap-6">
                <ul className="flex font-semibold">
                    <Link href="/" className="hover:text-amber-600 border-amber-600 border-r px-5 transition-colors duration-200">Inicio</Link>

                     <li className="relative group px-5  border-amber-600 border-r">
                            <Link href="#" className="flex items-center group-hover:text-amber-600 gap-3">
                            Inmuebles
                            <FaChevronDown className="hidden h-[2rem] w-[2rem] transform group-hover:rotate-180 transition-transform duration-450 lg:block" />
                            </Link>

                            <ul className="lg:absolute lg:hidden group-hover:block bg-gray-100 left-0 top-8 rounded-lg z-10">
                                <Link href="#" ><li className="hover:bg-amber-600 hover:text-[#ffffff] px-4 py-2 rounded-lg">Casas</li></Link>
                                <Link href="#" ><li className="hover:bg-amber-600 hover:text-[#ffffff] px-4 py-2 rounded-lg">Apartamentos</li></Link>
                                <Link href="#" ><li className="hover:bg-amber-600 hover:text-[#ffffff] px-4 py-2 rounded-lg">Edificios</li></Link>
                                {/*<Link href="#" ><li className="hover:bg-[#75512f] hover:text-[#ffffff] px-4 py-2 rounded-lg">Turistico</li></Link>*/}
                                <Link href="#" ><li className="hover:bg-amber-600 hover:text-[#ffffff] px-4 py-2 rounded-lg">Solares</li></Link>
                                <Link href="#" ><li className="hover:bg-amber-600 hover:text-[#ffffff] px-4 py-2 rounded-lg">Fincas</li></Link>

                            </ul>
                        </li>

                    <Link href="#" className="hover:text-amber-600 border-amber-600 border-r px-5">Nosotros</Link>

                    <Link href="/contacto" className="hover:text-amber-600 border-amber-600 px-5">Contactanos</Link>
                </ul>
            </nav>

            <div>
                
            </div>

            <div className="flex items-center gap-8">
            <Link 
                href="https://maps.app.goo.gl/rrWnhd7CMWDtmSow8"
                className="flex items-center gap-4 border border-transparent text-[1.6rem] text-white !bg-amber-700  px-4 py-2 rounded-[1rem] hover:!bg-white hover:!text-amber-700 hover:!border-amber-700 transition-colors duration-300"
                target="_blank"
            >
                <div>
                    <FaMapMarked/>
                </div>

                <span>La Vega</span>

            </Link>
            <p className="flex flex-col text-[1.6rem] text-amber-700">
                <span>Av. Imbert esq. Pedro J. Casado No. 94,</span> 
                <span>La Vega, Republica Dominicana </span>
            </p>
        </div>

            

        </div>
    )
}

export default NavBar;
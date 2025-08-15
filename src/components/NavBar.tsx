'use client';


import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {FaChevronDown, FaInstagram} from "react-icons/fa";

function NavBar(){
    const [isOpen, setIsOpen] = useState(false)
    


    return(
        <div className="flex justify-evenly items-center w-[90vw] mx-[auto] bg-[#FFFFFF] text-[1.8rem] p-3 text-Black relative z-50">

            <div className="flex justify-center gap-4 items-center text-[3rem]">
                <Image src="/EddyLopezProfile.jpg" alt="Eddy Lopez Profile" width={500} height={500} className="w-[7rem] rounded-full"></Image>
                <h2 className="font-bold">ARQ. EDDY LOPEZ</h2>
            </div>

            <nav className="flex items-center gap-6">
                <ul className="flex font-semibold">
                    <Link href="#" className="hover:text-amber-600 border-amber-600 border-r px-5 transition-colors duration-200">Inicio</Link>

                     <li className="relative group px-5  border-amber-600 border-r">
                            <Link href="#" className="flex items-center group-hover:text-amber-600 gap-3">
                            Inmuebles
                            <FaChevronDown className="hidden h-[2rem] w-[2rem] transform group-hover:rotate-180 transition-transform duration-450 lg:block" />
                            </Link>

                            <ul className="lg:absolute lg:hidden group-hover:block bg-gray-100 left-0 top-9 w-[35rem] rounded-lg z-10">
                                <Link href="#" ><li className="hover:bg-amber-600 hover:text-[#ffffff] px-4 py-2 rounded-lg">Casas</li></Link>
                                <Link href="#" ><li className="hover:bg-amber-600 hover:text-[#ffffff] px-4 py-2 rounded-lg">Apartamentos</li></Link>
                                <Link href="#" ><li className="hover:bg-amber-600 hover:text-[#ffffff] px-4 py-2 rounded-lg">Edificios</li></Link>
                                {/*<Link href="#" ><li className="hover:bg-[#75512f] hover:text-[#ffffff] px-4 py-2 rounded-lg">Turistico</li></Link>*/}
                                <Link href="#" ><li className="hover:bg-amber-600 hover:text-[#ffffff] px-4 py-2 rounded-lg">Solares</li></Link>
                                <Link href="#" ><li className="hover:bg-amber-600 hover:text-[#ffffff] px-4 py-2 rounded-lg">Fincas</li></Link>

                            </ul>
                        </li>

                    <Link href="#" className="hover:text-amber-600 border-amber-600 border-r px-5">Nosotros</Link>

                    <Link href="#" className="hover:text-amber-600 border-amber-600 px-5">Contacto</Link>
                </ul>
            </nav>

            <div className="relative group">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className=" flex items-center gap-2 p-2 text-left text-black group-hover:text-amber-600">
                        <Image 
                            src="/republica-dominicana.png" 
                            alt="Español" 
                            width={80} 
                            height={80} 
                            className="w-[2rem]"
                        />
                        Español
                        <FaChevronDown className="group-hover:rotate-180 group-hover:text-amber-600 transition-transform duration-300"/>
                </button>

                <div 
                    className="
                        absolute 
                        hidden 
                        group-hover:block 
                        flex-col justify-start items-start 
                        rounded-lg
                        bg-white
                    ">
                    <button className="flex w-full gap-2 cursor-pointer rounded-lg hover:bg-amber-600 hover:text-white p-2">
                        <Image 
                            src="/republica-dominicana.png" 
                            alt="Español" 
                            width={80} 
                            height={80} 
                            className="w-[2rem]"
                        />
                        Español
                    </button>

                    <button className="flex w-full gap-2 cursor-pointer rounded-lg hover:bg-amber-600 hover:text-white p-2">
                        <Image 
                            src="/estados-unidos.png" 
                            alt="Español" 
                            width={80} 
                            height={80} 
                            className="w-[2rem]"
                        />
                        Inglés
                    </button>
                </div>
            </div>

            

        </div>
    )
}

export default NavBar;
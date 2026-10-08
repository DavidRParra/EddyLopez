"use client";

import { useState, useEffect, useRef } from "react";
import { FaInstagram, FaFacebook, FaWhatsapp, FaChevronLeft } from "react-icons/fa";
import Link from "next/link";

export default function SocialMedia() {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div ref={containerRef} className="fixed z-50 bottom-15 right-0">
            
            {/* VERSIÓN MÓVIL (Menú Desplegable Lateral) */}
            <div className="flex md:hidden items-center">
                
                <div 
                    className={`
                        flex items-center gap-3 bg-white/90 backdrop-blur-md px-3 py-2 rounded-l-full shadow-lg border-y border-l border-gray-200
                        transition-all duration-300 ease-in-out origin-right
                        ${isOpen ? "opacity-100 scale-100 translate-x-0 pointer-events-auto" : "opacity-0 scale-50 translate-x-10 pointer-events-none w-0 overflow-hidden px-0"}
                    `}
                >
                    <Link 
                        href={"https://www.instagram.com/arqeddylopez/"} 
                        className="flex justify-center items-center bg-white text-[#002861] text-[1.5rem] w-12 h-12 rounded-full shadow-md hover:scale-110 transition-transform"
                        target="_blank"
                        aria-label="Instagram"
                    >
                        <FaInstagram />
                    </Link>

                    <Link 
                        href={"#"} 
                        className="flex justify-center items-center bg-white text-[#002861] text-[1.5rem] w-12 h-12 rounded-full shadow-md hover:scale-110 transition-transform"
                        aria-label="Facebook"
                    >
                        <FaFacebook />
                    </Link>

                    <Link 
                        href={"https://api.whatsapp.com/send/?phone=18495052000&text&type=phone_number&app_absent=0"} 
                        className="flex justify-center items-center bg-white text-[#002861] text-[1.5rem] w-12 h-12 rounded-full shadow-md hover:scale-110 transition-transform"
                        target="_blank"
                        aria-label="WhatsApp"
                    >
                        <FaWhatsapp />
                    </Link>
                </div>

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Abrir redes sociales"
                    className="
                        flex justify-center items-center
                        bg-[#002861] text-white text-[1.5rem]
                        w-12 h-14 rounded-l-xl shadow-xl
                        transition-transform duration-300 cursor-pointer
                    "
                >
                    <FaChevronLeft className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                </button>
            </div>

            {/* VERSIÓN DESKTOP (Flotante Vertical Fija) */}
            <div className="hidden md:flex flex-col gap-2 mr-10">
                <Link 
                    href={"https://www.instagram.com/arqeddylopez/"} 
                    className="flex justify-center items-center bg-white text-[#002861] text-[2rem] w-16 h-16 p-3 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
                    target="_blank"
                    aria-label="Instagram"
                >
                    <FaInstagram />
                </Link>

                <Link 
                    href={"#"} 
                    className="flex justify-center items-center bg-white text-[#002861] text-[2rem] w-16 h-16 p-3 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
                    aria-label="Facebook"
                >
                    <FaFacebook />
                </Link>

                <Link 
                    href={"https://api.whatsapp.com/send/?phone=18495052000&text&type=phone_number&app_absent=0"} 
                    className="flex justify-center items-center bg-white text-[#002861] text-[2rem] w-16 h-16 p-3 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
                    target="_blank"
                    aria-label="WhatsApp"
                >
                    <FaWhatsapp />
                </Link>
            </div>

        </div>
    );
}
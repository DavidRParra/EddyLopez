
import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";
import Link from "next/link";


function SocialMedia() {
    return (
        <div className="flex flex-col fixed z-50 gap-2 bottom-40 right-10">
            <Link 
                href={"https://www.instagram.com/arqeddylopez/"} 
                className="
                    flex justify-center items-center
                    bg-white text-[#2200b8] text-[2rem]
                    w-16 h-16
                    p-3 rounded-full shadow-lg 
                    hover:shadow-xl hover:text-[4rem] transition-all duration-300
                "
                target="_blank"
            >
                <FaInstagram />
            </Link>

            <Link 
                href={"#"} 
                className="
                    flex justify-center items-center
                    bg-white text-[#2200b8] text-[2rem]
                    w-16 h-16 
                    p-3 rounded-full shadow-lg 
                    hover:shadow-xl hover:text-[4rem] transition-all duration-300
                "
                
            >
                <FaFacebook />
            </Link>

            <Link 
                href={"https://api.whatsapp.com/send/?phone=18495052000&text&type=phone_number&app_absent=0"} 
                className="
                    flex justify-center items-center
                    bg-white text-[#2200b8] text-[2rem]
                    w-16 h-16
                    p-3 rounded-full shadow-lg 
                    hover:shadow-xl hover:text-[4rem] transition-all duration-300
                "
                target="_blank"
            >
                <FaWhatsapp />
            </Link>
        </div>

    )
}


export default SocialMedia;
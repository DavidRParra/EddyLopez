import Link from "next/link";
import Image from "next/image";
import SocialMedia from "@/components/SocialMedia";
import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";

type Tarjeta ={
    imagen : string;
    texto: string;
    url: string;
};

const datosTarjetas: Tarjeta[] = [
  {
    imagen: "/Historia_IG_1.jpg",
    texto: "Consejos y mas",
    url: "https://www.instagram.com/stories/highlights/17944449685335912/"
  },
  {
    imagen: "/Historia_IG_2.jpg",
    texto: "Bavaro Island",
    url: "https://www.instagram.com/stories/highlights/17912235125581342/"
  },
  {
    imagen: "/Historia_IG_3.jpg",
    texto: "Santiago",
    url: "https://www.instagram.com/stories/highlights/18002581441472586/"
  },
  {
    imagen: "/Historia_IG_4.jpg",
    texto: "La Vega",
    url: "https://www.instagram.com/stories/highlights/17866589758873687/"
  },
  {
    imagen: "/Historia_IG_5.jpg",
    texto: "Cora VIII",
    url: "https://www.instagram.com/stories/highlights/17962629730740201/"
  },
];

function NosotrosPage(){
    const mostrar = "CLIENTE";
    
    return (
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center w-full text-[4rem]">
            <h1 className="font-bold">Acerca de Nosotros</h1>
        </div>

        <div className="flex flex-col w-full mb-[4rem] items-center gap-6 text-[1.3rem] text-white bg-[#002861] p-9 rounded-[50] mt-8 font-bold">
          <p className="text-center">Con una trayectoria de más de tres décadas en el sector inmobiliario, el arquitecto Eddy López se ha consolidado como un referente por su profesionalismo, visión estratégica y compromiso inquebrantable con la excelencia.</p>

          <p className="text-center">Desde sus inicios en la ciudad de La Vega, ha liderado con éxito numerosos proyectos arquitectónicos y de inversión, adoptando un enfoque integral que articula diseño, construcción y asesoría personalizada. Esta metodología le ha permitido atender a más de 2,000 clientes en todo el territorio nacional.</p>

          <p className="text-center">Especializado en el diseño y desarrollo de proyectos residenciales y turísticos de alto rendimiento, el Arq. López ha creado espacios que armonizan elegancia, funcionalidad y durabilidad, respondiendo eficazmente a las exigencias del mercado contemporáneo.</p>

          <p className="text-center">Actualmente, impulsa iniciativas de inversión en diversas regiones del país, con especial énfasis en zonas costeras, ofreciendo propuestas exclusivas que destacan por su alta rentabilidad y valor estético garantizado.</p>

          <p className="text-center">Su ejercicio profesional se fundamenta en tres pilares esenciales: honestidad, innovación y resultados sostenibles, principios que orientan cada decisión y se reflejan en cada proyecto que desarrolla.</p>

        </div>

        <div className="flex w-[25%] justify-center mb-[1rem] gap-8">
            <div className="flex flex-col w-full gap-3">
                <div
                    
                    className="w-[25rem] h-[25rem] bg-cover bg-top rounded-full mx-auto"

                    style={{backgroundImage: "url('/EddyLopezProfile2.png')"}}
                />

                <p className="flex items-center justify-center font-light text-[3.2rem] text-center">Arq. Eddy Lopez</p>

                <p className="flex items-center justify-center font-b text-[1.8rem] text-center">Director Ejecutivo y Agente de Bienes Raices</p>


            </div>

            <div className="flex flex-col w-full gap-3">
                <div
                    
                    className="w-[25rem] h-[25rem] bg-cover  bg-position-[center_right_-7.5rem] rounded-full mx-auto"

                    style={{backgroundImage: "url('/SherylLopez.png')"}}
                />

                <p className="flex items-center justify-center font-light text-[3.2rem] text-center">Arq. Sheryl Lopez</p>

                <p className="flex items-center justify-center font-b text-[1.8rem] text-center">Arquitecta interiorista</p>


            </div>
        </div>

        <div className="flex gap-8 mb-16">
          <Link 
              href={"https://www.instagram.com/arqeddylopez/"} 
              className="
                  flex justify-center items-center
                  bg-white text-[#002861] text-[5rem]
                  w-32 h-32
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
                  bg-white text-[#002861] text-[5rem]
                  w-32 h-32 
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
                  bg-white text-[#002861] text-[5rem]
                  w-32 h-32
                  p-3 rounded-full shadow-lg 
                  hover:shadow-xl hover:text-[4rem] transition-all duration-300
              "
              target="_blank"
          >
              <FaWhatsapp />
          </Link>
        </div>
        
      {/*<div className="flex justify-center gap-8 w-full ">
        {datosTarjetas.map((tarjeta, index) => (
          <div 
              key={index}
              
          >
              <Link href={tarjeta.url} target="_blank" className="flex flex-col text-center gap-4 text-[1.5rem] w-full font-bold cursor-pointer">
                  <Image 
                      src={tarjeta.imagen} 
                      alt={tarjeta.texto}
                      width={300}
                      height={300}
                      className="flex w-[10rem] rounded-full"
                  />

                  <div>
                      <p>{tarjeta.texto}</p>
                  </div>
              </Link>
          </div>
        ))}

          

      </div>*/}

        
      </div>
    );

}

export default NosotrosPage;
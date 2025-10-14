import Link from "next/link";
import Image from "next/image";

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
    
    return (
        <div className="mt-[15vh] ml-[5vw">
            <div className="flex flex-col items-center w-full text-[4rem]">
                <h1 className="font-bold">Acerca de Nosotros</h1>
            </div>
            
            <div className="flex justify-center gap-8 w-full ">
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

                

            </div>
        </div>
    );

}

export default NosotrosPage;
import Image from "next/image";

const ImageUrls = [
  "/Portafolio1.jpg", 
  "/Portafolio2.png", 
  "/Portafolio3.jpg",
  "/Portafolio4.jpg",
  "/Portafolio5.jpg",
  "/Portafolio6.png"
];

export default function Page() {
  
  return (
    <div className="flex flex-col justify-center w-full h-[80vh]">
      <div className="grid grid-cols-3 justify-center items-center w-full h-full px-40">

        {ImageUrls.map((url, index) => (
          <div className="flex flex-col" key={index}>
            <Image
              key={index}
              src={url}
              alt={`Image ${index + 1}`}
              width={800}
              height={600}
              className="mx-auto my-4 w-[55rem] h-[30rem] rounded-2xl border border-black hover:scale-105 transition-transform duration-300 object-cover"
            />

            <div className="text-center text-[2.1rem] font-semibold">
              <p>Planos de Proyecto Terminado</p>
            </div>
          </div>
        ))
        }
      </div>
    </div>
  );
}
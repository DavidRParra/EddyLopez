import Image from "next/image";

function NuestroEquipo(){
    return (
        <div>
            <div className="flex justify-center mx-auto items-center h-[60vh] w-[80%]">
                <div className="flex w-[25%] group">
                    <div className="flex flex-col w-full gap-3">
                        <div
                            
                            className="w-[25rem] h-[25rem] bg-cover bg-top rounded-full mx-auto"

                            style={{backgroundImage: "url('/EddyLopezProfile2.png')"}}
                        />

                        <p className="flex items-center justify-center font-light text-[3.2rem] text-center">Arq. Eddy Lopez</p>

                        <p className="flex items-center justify-center font-b text-[1.8rem] text-center">Director Ejecutivo y Agente de Bienes Raices</p>


                    </div>

                    {/*<Image 
                        src={"/Jose_Resumen.png"}
                        alt="Jose Resumen"
                        width={900}
                        height={300}
                        className="absolute hidden w-[110rem] bottom-90 group-hover:block"
                    ></Image>*/}
                </div>

                <div className="flex flex-col w-[25%] gap-3">
                    <div
                        
                        className="w-[25rem] h-[25rem] bg-cover bg-bottom rounded-full mx-auto"

                        style={{backgroundImage: "url('/SherylLopez.png')"}}
                    />

                    <p className="flex items-center justify-center font-light text-[3.2rem] text-center">Arq. Sheryl Lopez</p>

                    <p className="flex items-center justify-center font-b text-[1.8rem] text-center">Arquitecta interiorista</p>


                </div>
            </div>
        </div>
    )
}


export default NuestroEquipo;
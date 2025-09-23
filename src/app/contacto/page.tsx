import ScaleIn from "@/components/ScaleIn"

function ContactoPage(){
    return (
        <div className="flex flex-col w-full items-center text-[1.8rem] h-[85vh] justify-center"
        style={{backgroundImage: "url('/Slider5.jpg')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
            
            <form action="" className="flex flex-col w-[70%]  border border-[#2200b8]/0 rounded-lg bg-white/0 shadow-lg">
                <ScaleIn>
                    <div className="bg-white py-8 px-20 rounded-lg">
                        <div className="mt-10">
                            <h2 className="text-[3rem] font-semibold text-[#2200b8] mb-5">Formulario de Consultas</h2>
                            <p className="font-semibold">Cuentanos lo que buscas y lo haremos realidad.</p>
                        </div>
                        <div className="flex w-full justify-between mt-10">
                            <div className="flex flex-col w-[48%]">
                                <label htmlFor="" className="text-[#2200b8]">
                                    Nombre
                                    <span className="text-red-700">*</span>
                                </label>
                                <input type="text" placeholder="Jose" className="flex border rounded-lg py-2 px-4" />
                            </div>

                            <div className="flex flex-col w-[48%]">
                                <label htmlFor="" className="text-[#2200b8]">
                                    Apellido
                                    <span className="text-red-700">*</span>
                                </label>
                                <input type="text" placeholder="Rodriguez" className="flex border rounded-lg py-2 px-4"/>
                            </div>
                        </div>

                        <div className="flex flex-col mt-5">
                            <label htmlFor="" className="text-[#2200b8]">
                                Email
                                <span className="text-red-700">*</span>
                            </label>
                            <input type="text" placeholder="joseR@ejemplo.com" className="flex border rounded-lg py-2 px-4"/>
                        </div>

                        <div className="flex flex-col mt-5">
                            <label htmlFor="" className="text-[#2200b8]">
                                Telefono
                                <span className="text-red-700">*</span>
                            </label>
                            <input type="number" placeholder="8298887777" className="flex border rounded-lg py-2 px-4"/>
                        </div>

                        <div className="flex flex-col mt-5">

                            <label htmlFor="" className="text-[#2200b8]">
                                Tipo de consulta
                                <span className="text-red-700">*</span>
                            </label>

                            <select name="tipo-consulta" id="tipo-consulta" className="flex border rounded-lg py-2 px-4">
                                <option value="default" hidden>--Sleccione una opcion--</option>
                                <option value="compra">Compra</option>
                                <option value="alquiler">Alquiler</option>
                                <option value="venta">Venta</option>
                                <option value="evaluacion">Evaluación</option>
                                <option value="hipoteca">Hipoteca</option>
                                <option value="compra">Otro</option>
                            </select>

                        </div>

                        <div className="flex flex-col my-10">
                            <label htmlFor="" className="text-[#2200b8]">
                                Mensaje
                                <span className="text-red-700">*</span>
                            </label>
                            <textarea name="" id="" rows={5} className="flex border rounded-lg py-2 px-4 resize-none"></textarea>
                        </div>
                        <div className="flex w-full justify-center">
                            <button className="flex justify-center w-[50%] border border-[#2200b8] rounded-lg py-2 px-4 bg-[#2200b8] text-white">
                                Enviar
                            </button>
                        </div>
                    </div>
                </ScaleIn>

            </form>
            

        </div>
    )
}

export default ContactoPage;
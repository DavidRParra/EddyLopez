'use client';

import React, { useState } from "react"
import ScaleIn from "@/components/ScaleIn"
import { FaArrowRight } from "react-icons/fa"

interface Appointment{
    appointmentDtlId?: number
    userID?: number;
    AppointmentAddressID?: number;
    firstName?: string;
    lastName?: string;
    fullName?: string;
    phone?: string;
    email?: string;
    consultingDate?: Date;
    consultingType?: string;
    comment?: string;
    status?: string;
    cratedBy?: string;
    createdDate?: Date;
    lastUpdateDate?: Date;
}



function ContactoPage(){
    const [formData, setFormData] = useState({
        firstName : "",
        lastName : "",
        phone : "",
        email : "",
        appointmentDate : "",
        type : "",
        message : ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const res = await fetch("/apis/guardar_formulario", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formData),
        })

        const data = await res.json()
        alert(data.message)
    }

    

    return (
        <div className="flex flex-col w-full items-center text-[1.8rem] h-[85vh] justify-center"
        style={{backgroundImage: "url('/Slider5.jpg')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
            
            <form onSubmit={handleSubmit} className="flex flex-col w-[70%]  border border-[#2200b8]/0 rounded-lg bg-white/0 shadow-lg">
                <ScaleIn>
                    <div className="bg-white py-8 px-20 rounded-lg">
                        <div className="mt-10">
                            <h2 className="text-[3rem] font-semibold text-[#2200b8] mb-5">Formulario de Consultas</h2>
                            <p className="font-semibold">Cuentanos lo que buscas y lo haremos realidad.</p>
                        </div>
                        <div className="flex w-full justify-between items-center mt-10">
                            <div className="flex flex-col w-[48%]">
                                <label htmlFor="" className="text-[#2200b8]">
                                    Nombre
                                    <span className="text-red-700">*</span>
                                </label>
                                <input 
                                    type="text" required
                                    name ="firstName"
                                    onChange={handleChange}
                                    placeholder="Jose" 
                                    className="flex border rounded-lg py-2 px-4" />
                            </div>

                            <div className="flex flex-col w-[48%]">
                                <label htmlFor="" className="text-[#2200b8]">
                                    Apellido
                                    <span className="text-red-700">*</span>
                                </label>
                                <input 
                                    type="text" required
                                    name ="lastName"
                                    onChange={handleChange}
                                    placeholder="Rodriguez" 
                                    className="flex border rounded-lg py-2 px-4"/>
                            </div>
                        </div>

                        <div className="flex w-full justify-between items-center mt-10">
                            <div className="flex flex-col w-[48%]">
                                <label htmlFor="" className="text-[#2200b8]">
                                    Telefono
                                    <span className="text-red-700">*</span>
                                </label>
                                <input 
                                    type="number" required
                                    name ="phone"
                                    onChange={handleChange}
                                    placeholder="8299992211" 
                                    className="flex border rounded-lg py-2 px-4" />
                            </div>

                            <div className="flex flex-col w-[48%]">
                                <label htmlFor="" className="text-[#2200b8]">
                                    Correo
                                    <span className="text-red-700">*</span>
                                </label>
                                <input 
                                    type="text" required
                                    name ="email"
                                    onChange={handleChange} 
                                    placeholder="JRodriguez@Ejemplo.com" 
                                    className="flex border rounded-lg py-2 px-4"/>
                            </div>
                        </div>

                        
                        <div className="flex w-full items-center justify-between mt-10">
                            <div className="flex flex-col mt-5 w-[48%]">

                                <label htmlFor="" className="text-[#2200b8]">
                                    Tipo de consulta
                                    <span className="text-red-700">*</span>
                                </label>

                                <select 
                                    name="type" 
                                    onChange={handleChange}
                                    required
                                    className="flex border rounded-lg py-2 px-4"
                                >
                                    <option value="default" hidden>--Seleccione una opcion--</option>
                                    <option value="compra">Compra</option>
                                    <option value="alquiler">Alquiler</option>
                                    <option value="venta">Venta</option>
                                    <option value="evaluacion">Evaluación</option>
                                    <option value="hipoteca">Hipoteca</option>
                                    <option value="compra">Otro</option>
                                </select>

                            </div>

                            <div className="flex flex-col mt-5 w-[48%]">
                                <label htmlFor="" className="text-[#2200b8]">
                                    Fecha de la consulta
                                    <span className="text-red-700">*</span>
                                </label>

                                <input 
                                    type="date" 
                                    name ="appointmentDate"
                                    onChange={handleChange}
                                    required
                                    className="flex border rounded-lg py-2 px-4"/>
                            </div>

                        </div>



                        <div className="flex flex-col my-10">
                            <label htmlFor="" className="text-[#2200b8]">
                                Mensaje
                                <span className="text-red-700">*</span>
                            </label>
                            <textarea 
                                name="message" required
                                onChange={handleChange}
                                placeholder="Escribe tu mensaje aqui..." 
                                rows={5} 
                                className="flex border rounded-lg py-2 px-4 resize-none">

                            </textarea>
                        </div>

                        <div className="flex items-center justify-center text-white">
                        <button 
                            className="
                                flex items-center justify-center gap-4 
                                mx-auto
                                border border-transparent rounded-full 
                                bg-[#2200b8] py-1 px-4 cursor-pointer 
                                hover:text-[#2200b8] hover:border-[#2200b8] hover:bg-white"
                            >
                            Confirmar cita
                            <FaArrowRight className="border rounded-full p-1"/>
                        </button>
                    </div>
                    </div>
                </ScaleIn>

            </form>
            

        </div>
    )
}

export default ContactoPage;
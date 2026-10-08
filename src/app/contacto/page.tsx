"use client";

import React, { useState } from "react";
import ScaleIn from "@/components/ScaleIn";
import { FaArrowRight } from "react-icons/fa";
import ModalImage from "@/components/modals/modal-image";

interface Appointment {
  appointmentDtlId?: number;
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

function ContactoPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [modalMessage, setModalMessage] = useState(
    "Error al enviar el formulario. Por favor, intenta de nuevo."
  );

  const [confirm, setConfirm] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    appointmentDate: "",
    type: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/apis/guardar_formulario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      setModalMessage(
        "Cita creada con éxito, nuestra oficina se pondrá en contacto contigo pronto."
      );

      setConfirm(true);
      openModal();
    } catch (error) {
      setModalMessage(
        "Error al crear la cita. Por favor, intenta de nuevo.\n" + error
      );

      setConfirm(false);
      openModal();
    }
  };

  return (
    <main
      className="
        min-h-screen
        w-full

        flex
        items-center
        justify-center

        px-4
        py-10

        sm:px-6
        sm:py-12

        md:px-8
        md:py-14

        lg:px-12
        lg:py-16

        bg-cover
        bg-center
        bg-no-repeat
      "
      style={{
        backgroundImage: "url('/Slider5.jpg')",
      }}
    >
      {/* =====================================================
          FORMULARIO PRINCIPAL
      ====================================================== */}

      <form
        onSubmit={handleSubmit}
        className="
          w-full
          max-w-[1100px]

          mx-auto

          rounded-2xl

          shadow-2xl

          overflow-hidden
        "
      >
        <ScaleIn>
          <div
            className="
              w-full

              bg-white

              px-6
              py-8

              sm:px-8
              sm:py-10

              md:px-12
              md:py-12

              lg:px-16
              lg:py-14
            "
          >
            {/* =====================================================
                TITULO
            ====================================================== */}

            <div
              className="
                mb-8

                sm:mb-10

                md:mb-12
              "
            >
              <h2
                className="
                  text-[#2200b8]

                  font-bold

                  text-3xl
                  sm:text-4xl
                  md:text-5xl

                  leading-tight

                  mb-3
                "
              >
                Formulario de Consultas
              </h2>

              <p
                className="
                  text-gray-700

                  text-lg
                  md:text-xl

                  font-semibold

                  leading-relaxed
                "
              >
                Cuéntanos lo que buscas y lo haremos realidad.
              </p>
            </div>

            {/* =====================================================
                NOMBRE / APELLIDO
            ====================================================== */}

            <div
              className="
                grid

                grid-cols-1
                md:grid-cols-2

                gap-6
                md:gap-8

                mb-7
                md:mb-8
              "
            >
              {/* NOMBRE */}

              <div className="flex flex-col">
                <label
                  htmlFor="firstName"
                  className="
                    mb-2

                    text-[#2200b8]

                    font-semibold

                    text-lg
                    md:text-xl
                  "
                >
                  Nombre
                  <span className="text-red-700"> *</span>
                </label>

                <input
                  id="firstName"
                  type="text"
                  required
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Jose"
                  className="
                    w-full

                    border
                    border-gray-300

                    rounded-lg

                    py-3
                    px-4

                    sm:py-3.5
                    sm:px-5

                    text-lg
                    md:!text-xl

                    text-gray-800

                    bg-white

                    outline-none

                    focus:border-[#2200b8]

                    focus:ring-2
                    focus:ring-[#2200b8]/20

                    transition-all
                    duration-200
                  "
                />
              </div>

              {/* APELLIDO */}

              <div className="flex flex-col">
                <label
                  htmlFor="lastName"
                  className="
                    mb-2

                    text-[#2200b8]

                    font-semibold

                    text-lg
                    md:text-xl
                  "
                >
                  Apellido
                  <span className="text-red-700"> *</span>
                </label>

                <input
                  id="lastName"
                  type="text"
                  required
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Rodriguez"
                  className="
                    w-full

                    border
                    border-gray-300

                    rounded-lg

                    py-3
                    px-4

                    sm:py-3.5
                    sm:px-5

                    text-lg
                    md:!text-xl

                    text-gray-800

                    bg-white

                    outline-none

                    focus:border-[#2200b8]

                    focus:ring-2
                    focus:ring-[#2200b8]/20

                    transition-all
                    duration-200
                  "
                />
              </div>
            </div>

            {/* =====================================================
                TELEFONO / CORREO
            ====================================================== */}

            <div
              className="
                grid

                grid-cols-1
                md:grid-cols-2

                gap-6
                md:gap-8

                mb-7
                md:mb-8
              "
            >
              {/* TELEFONO */}

              <div className="flex flex-col">
                <label
                  htmlFor="phone"
                  className="
                    mb-2

                    text-[#2200b8]

                    font-semibold

                    text-lg
                    md:text-xl
                  "
                >
                  Teléfono
                  <span className="text-red-700"> *</span>
                </label>

                <input
                  id="phone"
                  type="tel"
                  required
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="8299992211"
                  className="
                    w-full

                    border
                    border-gray-300

                    rounded-lg

                    py-3
                    px-4

                    sm:py-3.5
                    sm:px-5

                    text-lg
                    md:!text-xl

                    text-gray-800

                    bg-white

                    outline-none

                    focus:border-[#2200b8]

                    focus:ring-2
                    focus:ring-[#2200b8]/20

                    transition-all
                    duration-200
                  "
                />
              </div>

              {/* CORREO */}

              <div className="flex flex-col">
                <label
                  htmlFor="email"
                  className="
                    mb-2

                    text-[#2200b8]

                    font-semibold

                    text-lg
                    md:text-xl
                  "
                >
                  Correo
                  <span className="text-red-700"> *</span>
                </label>

                <input
                  id="email"
                  type="email"
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="JRodriguez@Ejemplo.com"
                  className="
                    w-full

                    border
                    border-gray-300

                    rounded-lg

                    py-3
                    px-4

                    sm:py-3.5
                    sm:px-5

                    text-lg
                    md:!text-xl

                    text-gray-800

                    bg-white

                    outline-none

                    focus:border-[#2200b8]

                    focus:ring-2
                    focus:ring-[#2200b8]/20

                    transition-all
                    duration-200
                  "
                />
              </div>
            </div>

            {/* =====================================================
                TIPO / FECHA
            ====================================================== */}

            <div
              className="
                grid

                grid-cols-1
                md:grid-cols-2

                gap-6
                md:gap-8

                mb-7
                md:mb-8
              "
            >
              {/* TIPO */}

              <div className="flex flex-col">
                <label
                  htmlFor="type"
                  className="
                    mb-2

                    text-[#2200b8]

                    font-semibold

                    text-lg
                    md:text-xl
                  "
                >
                  Tipo de consulta
                  <span className="text-red-700"> *</span>
                </label>

                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                  className="
                    w-full

                    border
                    border-gray-300

                    rounded-lg

                    py-3
                    px-4

                    sm:py-3.5
                    sm:px-5

                    text-lg
                    md:!text-xl

                    text-gray-800

                    bg-white

                    outline-none

                    focus:border-[#2200b8]

                    focus:ring-2
                    focus:ring-[#2200b8]/20

                    transition-all
                    duration-200
                  "
                >
                  <option value="" disabled>
                    --Seleccione una opción--
                  </option>

                  <option value="compra">
                    Compra
                  </option>

                  <option value="alquiler">
                    Alquiler
                  </option>

                  <option value="venta">
                    Venta
                  </option>

                  <option value="evaluacion">
                    Evaluación
                  </option>

                  <option value="hipoteca">
                    Hipoteca
                  </option>

                  <option value="otro">
                    Otro
                  </option>
                </select>
              </div>

              {/* FECHA */}

              <div className="flex flex-col">
                <label
                  htmlFor="appointmentDate"
                  className="
                    mb-2

                    text-[#2200b8]

                    font-semibold

                    text-lg
                    md:text-xl
                  "
                >
                  Fecha de la consulta
                  <span className="text-red-700"> *</span>
                </label>

                <input
                  id="appointmentDate"
                  type="date"
                  name="appointmentDate"
                  value={formData.appointmentDate}
                  onChange={handleChange}
                  required
                  className="
                    w-full

                    border
                    border-gray-300

                    rounded-lg

                    py-3
                    px-4

                    sm:py-3.5
                    sm:px-5

                    text-lg
                    md:!text-xl

                    text-gray-800

                    bg-white

                    outline-none

                    focus:border-[#2200b8]

                    focus:ring-2
                    focus:ring-[#2200b8]/20

                    transition-all
                    duration-200
                  "
                />
              </div>
            </div>

            {/* =====================================================
                MENSAJE
            ====================================================== */}

            <div
              className="
                flex
                flex-col

                mb-9
                md:mb-10
              "
            >
              <label
                htmlFor="message"
                className="
                  mb-2

                  text-[#2200b8]

                  font-semibold

                  text-lg
                  md:text-xl
                "
              >
                Mensaje
                <span className="text-red-700"> *</span>
              </label>

              <textarea
                id="message"
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                placeholder="Escribe tu mensaje aquí..."
                rows={6}
                className="
                  w-full

                  border
                  border-gray-300

                  rounded-lg

                  py-3
                  px-4

                  sm:py-4
                  sm:px-5

                  text-lg
                  md:!text-xl

                  text-gray-800

                  bg-white

                  resize-none

                  outline-none

                  focus:border-[#2200b8]

                  focus:ring-2
                  focus:ring-[#2200b8]/20

                  transition-all
                  duration-200
                "
              />
            </div>

            {/* =====================================================
                BOTON
            ====================================================== */}

            <div className="flex justify-center">
              <button
                type="submit"
                className="
                  flex
                  items-center
                  justify-center

                  gap-3

                  rounded-full

                  bg-[#2200b8]

                  text-white

                  px-7
                  py-3

                  sm:px-8
                  sm:py-3.5

                  text-lg
                  md:!text-xl

                  font-semibold

                  border
                  border-[#2200b8]

                  cursor-pointer

                  transition-all
                  duration-300

                  hover:bg-white
                  hover:text-[#2200b8]

                  hover:shadow-xl

                  active:scale-95
                "
              >
                Confirmar cita

                <FaArrowRight
                  className="
                    w-12
                    h-12

                    p-1

                    border
                    border-current

                    rounded-full
                  "
                />
              </button>
            </div>
          </div>
        </ScaleIn>

        {/* =====================================================
            MODAL
        ====================================================== */}

        <ModalImage
          isOpen={isModalOpen}
          onClose={closeModal}
        >
          <div
            className="
              w-[90vw]

              sm:w-[500px]

              max-w-[95vw]

              flex
              flex-col

              justify-center
              items-center

              bg-white

              rounded-2xl

              p-6

              sm:p-8

              md:p-10

              gap-6

              shadow-2xl
            "
          >
            <p
              className="
                text-center

                text-base
                sm:text-lg
                md:text-xl

                font-bold

                leading-relaxed

                whitespace-pre-line

                text-gray-800
              "
            >
              {modalMessage}
            </p>

            <button
              type="button"
              className="
                bg-[#2200b8]

                text-white

                py-2.5
                px-8

                rounded-lg

                text-base
                sm:text-lg

                font-semibold

                hover:bg-[#150078]

                transition-colors

                cursor-pointer
              "
              onClick={() => {
                closeModal();

                if (confirm) {
                  window.location.reload();
                }
              }}
            >
              Ok
            </button>
          </div>
        </ModalImage>
      </form>
    </main>
  );
}

export default ContactoPage;
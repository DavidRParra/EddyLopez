import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";

function NosotrosPage() {
  return (
    <main className="w-full flex flex-col items-center">

      {/* =========================
          TITULO
      ========================== */}
      <section className="w-full flex justify-center px-4 pt-8 sm:pt-10 md:pt-12">
        <h1
          className="
            text-center
            font-bold
            !text-[3rem]
            !sm:text-[3rem]
            !md:text-[3.5rem]
          "
        >
          Acerca de Nosotros
        </h1>
      </section>


      {/* =========================
          INFORMACION
      ========================== */}
      <section
        className="
          w-[80vw]
          mx-auto
          mt-8
          sm:mt-10
          mb-8
          sm:mb-10

          bg-[#002861]
          text-white

          rounded-[35px]
          sm:rounded-[45px]
          lg:rounded-[50px]

          px-5
          py-6

          sm:px-8
          sm:py-7

          md:px-12
          md:py-8

          lg:px-16
          lg:py-5

          flex
          flex-col
          items-center

          gap-3
          sm:gap-4
          lg:gap-2

          font-bold

          text-[1.4rem]
          sm:text-[1.5rem]
          md:text-[1.6rem]
          lg:text-[1.8rem]

          leading-relaxed
        "
      >
        <p className="w-full text-center">
          Con una trayectoria de más de tres décadas en el sector inmobiliario,
          el arquitecto Eddy López se ha consolidado como un referente por su
          profesionalismo, visión estratégica y compromiso inquebrantable con
          la excelencia.
        </p>

        <p className="w-full text-center">
          Desde sus inicios en la ciudad de La Vega, ha liderado con éxito
          numerosos proyectos arquitectónicos y de inversión, adoptando un
          enfoque integral que articula diseño, construcción y asesoría
          personalizada. Esta metodología le ha permitido atender a más de
          2,000 clientes en todo el territorio nacional.
        </p>

        <p className="w-full text-center">
          Especializado en el diseño y desarrollo de proyectos residenciales y
          turísticos de alto rendimiento, el Arq. López ha creado espacios que
          armonizan elegancia, funcionalidad y durabilidad, respondiendo
          eficazmente a las exigencias del mercado contemporáneo.
        </p>

        <p className="w-full text-center">
          Actualmente, impulsa iniciativas de inversión en diversas regiones
          del país, con especial énfasis en zonas costeras, ofreciendo
          propuestas exclusivas que destacan por su alta rentabilidad y valor
          estético garantizado.
        </p>

        <p className="w-full text-center">
          Su ejercicio profesional se fundamenta en tres pilares esenciales:
          honestidad, innovación y resultados sostenibles, principios que
          orientan cada decisión y se reflejan en cada proyecto que desarrolla.
        </p>
      </section>


      {/* =========================
          PERFILES
      ========================== */}
      <section
        className="
          w-full

          flex
          flex-col
          md:flex-row

          justify-center
          items-center

          gap-10
          sm:gap-12
          md:gap-8
          lg:gap-12

          mb-6
          sm:mb-8
        "
      >

        {/* =========================
            EDDY LOPEZ
        ========================== */}
        <div
          className="
            flex
            flex-col
            items-center
            text-center

            w-full
            md:w-auto

            gap-1
          "
        >
          <div
            className="
              relative

              w-[14rem]
              h-[14rem]

              md:w-[20rem]
              md:h-[20rem]

              rounded-full
              overflow-hidden

              bg-gray-100
            "
          >
            <Image
              src="/Eddy-Lopez-new.jpeg"
              alt="Arq. Eddy Lopez"
              fill
              sizes="
                (max-width: 640px) 144px,
                (max-width: 768px) 160px,
                176px
              "
              className="object-cover object-top"
            />
          </div>

          <h2
            className="
              mt-1

              font-light

              text-[1.6rem]
              sm:text-[1.5rem]
              md:text-[1.55rem]
              lg:text-[1.6rem]
            "
          >
            Arq. Eddy Lopez
          </h2>

          <p
            className="
              max-w-[13rem]

              text-[1rem]
              sm:text-[0.85rem]
              md:text-[0.85rem]

              leading-tight
              font-medium
            "
          >
            Director Ejecutivo y Agente de Bienes Raíces
          </p>
        </div>


        {/* =========================
            SHERYL LOPEZ
        ========================== */}
        <div
          className="
            flex
            flex-col
            items-center
            text-center

            w-full
            md:w-auto

            gap-1
          "
        >
          <div
            className="
              relative

              w-[14rem]
              h-[14rem]

              md:w-[20rem]
              md:h-[20rem]

              rounded-full
              overflow-hidden

              bg-gray-100
            "
          >
            <Image
              src="/SherylLopez.png"
              alt="Arq. Sheryl Lopez"
              fill
              sizes="
                (max-width: 640px) 144px,
                (max-width: 768px) 160px,
                176px
              "
              className="object-cover object-[65%_center]"
            />
          </div>

          <h2
            className="
              mt-1

              font-light

              text-[1.4rem]
              sm:text-[1.5rem]
              md:text-[1.55rem]
              lg:text-[1.6rem]
            "
          >
            Arq. Sheryl Lopez
          </h2>

          <p
            className="
              max-w-[13rem]

              text-[0.8rem]
              sm:text-[0.85rem]
              md:text-[0.85rem]

              leading-tight
              font-medium
            "
          >
            Arquitecta Interiorista
          </p>
        </div>

      </section>


      {/* =========================
          REDES SOCIALES
      ========================== */}
      <section
        className="
          flex
          justify-center
          items-center

          gap-4
          sm:gap-5

          mb-10
          sm:mb-14
        "
      >

        {/* INSTAGRAM */}
        <Link
          href="https://www.instagram.com/arqeddylopez/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="
            flex
            items-center
            justify-center

            w-20
            h-20

            md:w-25
            md:h-25

            rounded-full

            bg-white
            text-[#002861]

            shadow-lg

            transition-all
            duration-300

            hover:scale-110
            hover:shadow-xl
          "
        >
          <FaInstagram
            className="
              w-15
              h-15

              sm:w-20
              sm:h-20
            "
          />
        </Link>


        {/* FACEBOOK */}
        <Link
          href="#"
          aria-label="Facebook"
          className="
            flex
            items-center
            justify-center

            w-20
            h-20

            md:w-25
            md:h-25

            rounded-full

            bg-white
            text-[#002861]

            shadow-lg

            transition-all
            duration-300

            hover:scale-110
            hover:shadow-xl
          "
        >
          <FaFacebook
            className="
              w-15
              h-15

              sm:w-20
              sm:h-20
            "
          />
        </Link>


        {/* WHATSAPP */}
        <Link
          href="https://api.whatsapp.com/send/?phone=18495052000&text&type=phone_number&app_absent=0"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          className="
            flex
            items-center
            justify-center

            w-20
            h-20

            md:w-25
            md:h-25

            rounded-full

            bg-white
            text-[#002861]

            shadow-lg

            transition-all
            duration-300

            hover:scale-110
            hover:shadow-xl
          "
        >
          <FaWhatsapp
            className="
              w-15
              h-15

              sm:w-20
              sm:h-20
            "
          />
        </Link>

      </section>

    </main>
  );
}

export default NosotrosPage;


function FooterPage(){
    return(
        <footer className=" flex items-center justify-between py-4 px-7 bg-[#2200b8] text-white z-20 text-xl">
            <p className="">
                &copy; {new Date().getFullYear()} Arq. Eddy Lopez. Todos los derechos reservados.
            </p>

            <p className=""> &copy; Powered By DRTechGroup</p>
        </footer>
    );
}

export default FooterPage;
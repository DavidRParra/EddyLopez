function FooterPage(){
    return(
        <footer className="flex flex-col sm:flex-row items-center justify-between py-4 px-6 md:px-12 bg-[#002861] text-white z-20 text-[1.4rem] md:text-xl gap-4 border-t border-blue-900">
            <p className="text-center sm:text-left">
                &copy; {new Date().getFullYear()} Arq. Eddy Lopez. Todos los derechos reservados.
            </p>

            <p className="text-center sm:text-right font-semibold">
                Powered By DRTechGroup
            </p>
        </footer>
    );
}

export default FooterPage;
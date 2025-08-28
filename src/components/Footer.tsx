

function FooterPage(){
    return(
        <footer className=" flex items-center justify-center p-4 bg-amber-700 text-white z-20">
            <p className="text-sm">
                © {new Date().getFullYear()} Arq. Eddy Lopez. Todos los derechos reservados.
            </p>
        </footer>
    );
}

export default FooterPage;
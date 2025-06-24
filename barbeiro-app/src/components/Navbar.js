import Image from "next/image"

export default function Navbar() {
    return (
        <nav className="bg-black w-full flex items-center justify-between p-4">
            <div className="flex-grow"></div> 

            <Image 
                src="/barbearia-frente.png" 
                alt="Logo"
                width={30}
                height={30}
                className="mx-auto"
            />

            <div className="flex-grow flex justify-end">
                <Image 
                    src="/3-barras.png" 
                    alt="Menu Hamburguer"
                    width={30}
                    height={30}
                />
            </div>
        </nav>
    )
}
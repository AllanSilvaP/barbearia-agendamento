'use client'

import { useState } from "react"
import Image from "next/image"

export default function Navbar() {
    const [menuAberto, setMenuAberto] = useState(false)
    return (
        <>
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
                    <button onClick={() => setMenuAberto(!menuAberto)}>
                        <Image
                            src="/3-barras.png"
                            alt="Menu Hamburguer"
                            width={30}
                            height={30}
                            className="cursor-pointer"
                        />
                    </button>
                </div>
            </nav>

            {/* Menu lateral direita */}
            <div
                className={`fixed top-0 right-0 h-full w-64 bg-gray-700 text-white shadow-lg z-50 transform transition-transform duration-300 ${menuAberto ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="flex justify-end p-4">
                    <button onClick={() => setMenuAberto(false)}>✕</button>
                </div>
                <nav className="flex flex-col items-start px-6 space-y-4 font-sans">
                    <a href="/" onClick={() => setMenuAberto(false)} className="hover:text-gray-300">Início</a>
                    <a href="#servicos" onClick={() => setMenuAberto(false)} className="hover:text-gray-300">Serviços</a>
                    <a href="#agendar" onClick={() => setMenuAberto(false)} className="hover:text-gray-300">Agendar</a>
                    <a href="/login" onClick={() => setMenuAberto(false)} className="hover:text-gray-300">Login</a>
                    <a href="/cadastro" onClick={() => setMenuAberto(false)} className="hover:text-gray-300">Cadastro</a>
                </nav>
            </div>
        </>
    )
}
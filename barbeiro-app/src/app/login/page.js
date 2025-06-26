'use client'

import Navbar from "@/components/Navbar";
import { useState } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [erro, setErro] = useState("")

    //PUXAR APIs
    async function handleSubmit(e) {
        e.preventDefault()

        setErro("")

        const headers = {"Content-Type": "application/json"}

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers,
                body: JSON.stringify({email,senha}),
            })

            const data = await res.json()

            if (!res.ok) {
                setErro(data.erro || "Erro no login")
                return
            }

            localStorage.setItem("token", data.token)
            //LOGS INICIAIS
            localStorage.setItem("usuario", JSON.stringify(data.usuario))

            if(data.usuario.cargo === "Admin") {
                window.location.href = "/hubadmin"
            } else if (data.usuario.cargo === "Barbeiro") {
                window.location.href = "/hubbarbeiro"
            } else if (data.usuario.cargo === "Cliente") {
                window.location.href = "/hubcliente"
            } else {
                window.location.href = "/"
            }
        } catch (error) {
            console.error(error)
            setErro("Erro ao conectar com o servidor")
        }
    }

    return (
        <>
            <Navbar />
            <main className="min-h-screen flex flex-col items-center justify-center bg-[#D7CCC8]">
                <h1 className="font-bold text-3xl mb-6">Login</h1>

                {erro && <p className="text-red-500 mb-4">{erro}</p>}

                <form 
                className="bg-[#808080] shadow-md rounded px-8 pt-6 pb-8 w-full max-w-sm"
                onSubmit={handleSubmit}
                >
                    <div className="mb-4">
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></input>
                    </div>
                    <div className="mb-6">
                        <input
                            type="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        ></input>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-black text-white font-bold py-2 px-4 rounded hover:bg-gray-800"
                    >Entrar</button>

                </form>
            </main>
        </>
    )
}
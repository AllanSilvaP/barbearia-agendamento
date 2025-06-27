"use client"

import { useState } from 'react'
import Navbar from "@/components/Navbar"

export default function CadastroPage() {
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [erro, setErro] = useState("")

    async function handleSubmitCadastro(e) {
        e.preventDefault()
        setErro("")

        if (!nome || !email || !senha) {
            setErro("Todos os campos são obrigatórios")
            return
        }

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ nome, email, senha }),
            })

            const data = await res.json()

            if (!res.ok) {
                setErro(data.erro || "Erro ao cadastrar")
                return
            }

            window.location.href = "/login"
        } catch (err) {
            console.error(err)
            setErro("Erro ao conectar com o servidor")
        }
    }

    return (
        <>
            <Navbar />
            <main className="min-h-screen flex flex-col items-center justify-center bg-[#D7CCC8]">
                <h1 className="font-bold text-3xl mb-6">Cadastro</h1>

                {erro && <p className="text-red-600 mb-4">{erro}</p>}

                <form
                    className="bg-[#808080] shadow-md rounded px-8 pt-6 pb-8 w-full max-w-sm"
                    onSubmit={handleSubmitCadastro}
                >
                    <div className="mb-4">
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <input
                            type="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-black text-white font-bold py-2 px-4 rounded hover:bg-gray-800"
                    >
                        Cadastrar
                    </button>
                </form>
            </main>
        </>
    )
}

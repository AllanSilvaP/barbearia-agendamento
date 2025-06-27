'use client'
import { useEffect, useState } from "react"
import { getServicos } from "@/services/ApiServicos"
import { createAgendamento } from "@/services/ApiAgendamentos"
import { getPerfil } from "@/services/ApiUsuarios"

export default function FormAgendamento({ barbeiro, data, onFechar }) {
    const [servicos, setServicos] = useState([])
    const [form, setForm] = useState({
        servicoId: "",
        horario: "",
        nomeCliente: "",
        emailCliente: ""
    })
    const [mensagem, setMensagem] = useState("")


    useEffect(() => {
        async function carregarServicos() {
            const lista = await getServicos()
            setServicos(lista)
        }
        carregarServicos()
    }, [])

    async function handleSubmit(e) {
        e.preventDefault()
        const token = localStorage.getItem("token")

        const dados = {
            barbeiroId: barbeiro.id,
            data: data.toISOString().split("T")[0],
            horario: form.horario,
            servicoId: parseInt(form.servicoId),
            nomeCliente: form.nomeCliente,
            emailCliente: form.emailCliente,
        }

        try {
            await createAgendamento(dados, token)
            setMensagem("Agendamento criado com sucesso!")
            setForm({ servicoId: "", horario: "", nomeCliente: "", emailCliente: "" })
            setTimeout(onFechar, 2000)
        } catch (error) {
            console.error(error)
            setMensagem("Erro ao criar agendamento.")
        }
    }

    return (
        <div className="bg-white text-black p-6 rounded shadow-md w-full max-w-md mx-auto mt-4">
            <h2 className="text-lg font-bold mb-4">Agendar com {barbeiro.nome}</h2>

            {mensagem && <p className="mb-2 text-center text-green-600">{mensagem}</p>}

            <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                    <label className="block mb-1">Serviço</label>
                    <select
                        value={form.servicoId}
                        onChange={e => setForm({ ...form, servicoId: e.target.value })}
                        className="w-full border px-3 py-2 rounded"
                        required
                    >
                        <option value="">Selecione</option>
                        {servicos.map(servico => (
                            <option key={servico.id} value={servico.id}>
                                {servico.nome} - R$ {servico.preco.toFixed(2)}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block mb-1">Horário</label>
                    <input
                        type="time"
                        value={form.horario}
                        onChange={e => setForm({ ...form, horario: e.target.value })}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1">Seu nome</label>
                    <input
                        type="text"
                        value={form.nomeCliente}
                        onChange={e => setForm({ ...form, nomeCliente: e.target.value })}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1">Seu email</label>
                    <input
                        type="email"
                        value={form.emailCliente}
                        onChange={e => setForm({ ...form, emailCliente: e.target.value })}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>

                <div className="flex justify-between pt-2">
                    <button type="submit" className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
                        Confirmar
                    </button>
                    <button type="button" onClick={onFechar} className="text-red-600 hover:underline">
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    )
}

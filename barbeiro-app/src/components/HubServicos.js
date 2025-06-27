'use client'

import { useEffect, useState } from "react"
import { getServicos, createServico, updateServico, deleteServico } from "@/services/ApiServicos"

export default function HubServicos() {
    const [servicos, setServicos] = useState([])
    const [form, setForm] = useState({ nome: "", descricao: "", preco: "", duracao_min: "" })
    const [editandoId, setEditandoId] = useState(null)

    useEffect(() => {
        carregarServicos()
    }, [])

    async function carregarServicos() {
        const data = await getServicos()
        setServicos(data)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        const token = localStorage.getItem("token")


        if (editandoId) {
            await updateServico(editandoId, form, token) 
        } else {
            await createServico(form, token) 
        }

        setForm({ nome: "", descricao: "", preco: "", duracao_min: "" })
        setEditandoId(null)
        carregarServicos()
    }

    function editarServico(servico) {
        setForm(servico)
        setEditandoId(servico.id)
    }

    async function excluirServico(id) {
        const token = localStorage.getItem("access_token")
        if (confirm("Tem certeza que deseja excluir?")) {
            await deleteServico(id, token) 
            carregarServicos()
        }
    }

    return (
        <div className="bg-white text-black rounded p-4 shadow-md">
            <h2 className="text-xl font-bold mb-4">Serviços</h2>

            <form onSubmit={handleSubmit} className="space-y-2 mb-6">
                <input type="text" placeholder="Nome" className="input" value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} />
                <input type="text" placeholder="Descrição" className="input" value={form.descricao} onChange={e => setForm({ ...form, descricao: e.target.value })} />
                <input type="number" placeholder="Preço" className="input" value={form.preco} onChange={e => setForm({ ...form, preco: e.target.value })} />
                <input type="number" placeholder="Duração (min)" className="input" value={form.duracao_min} onChange={e => setForm({ ...form, duracao_min: e.target.value })} />
                <button type="submit" className="bg-black text-white px-4 py-2 rounded">
                    {editandoId ? "Atualizar" : "Cadastrar"}
                </button>
            </form>

            <table className="w-full text-left border">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="p-2 border">Nome</th>
                        <th className="p-2 border">Descrição</th>
                        <th className="p-2 border">Preço</th>
                        <th className="p-2 border">Duração</th>
                        <th className="p-2 border">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {servicos.map((servico) => (
                        <tr key={servico.id}>
                            <td className="p-2 border">{servico.nome}</td>
                            <td className="p-2 border">{servico.descricao}</td>
                            <td className="p-2 border">R$ {servico.preco.toFixed(2)}</td>
                            <td className="p-2 border">{servico.duracao_min} min</td>
                            <td className="p-2 border">
                                <button onClick={() => editarServico(servico)} className="mr-2 text-blue-600">✏️</button>
                                <button onClick={() => excluirServico(servico.id)} className="text-red-600">❌</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

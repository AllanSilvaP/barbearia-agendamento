'use client'

import { useEffect, useState } from "react"
import {
  getUsuarios,
  createUsuario,
  updateUsuario,
  deleteUsuario,
} from "@/services/ApiUsuarios"

export default function HubContas() {
  const [usuarios, setUsuarios] = useState([])
  const [form, setForm] = useState({
    nome: "",
    email: "",
    cargo: "Cliente",
    senha: "",
  })
  const [editandoId, setEditandoId] = useState(null)
  const [erro, setErro] = useState("")

  useEffect(() => {
    carregarUsuarios()
  }, [])

  async function carregarUsuarios() {
    const data = await getUsuarios()
    setUsuarios(data)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setErro("")
    const token = localStorage.getItem("token")
    try {
      if (!form.nome || !form.email || !form.cargo) {
        setErro("Preencha nome, email e cargo")
        return
      }

      // No criar, senha obrigatória; no editar, só atualiza se preencher
      if (!editandoId && !form.senha) {
        setErro("Senha é obrigatória para criar")
        return
      }

      const dadosEnvio = {
        nome: form.nome,
        email: form.email,
        cargo: form.cargo,
      }

      if (form.senha) {
        dadosEnvio.senha = form.senha
      }

      if (editandoId) {
        await updateUsuario(editandoId, dadosEnvio, token)
      } else {
        await createUsuario(dadosEnvio, token)
      }

      setForm({ nome: "", email: "", cargo: "Cliente", senha: "" })
      setEditandoId(null)
      carregarUsuarios()
    } catch (error) {
      setErro("Erro ao salvar usuário")
      console.error(error)
    }
  }

  function editarUsuario(usuario) {
    setForm({
      nome: usuario.nome,
      email: usuario.email,
      cargo: usuario.cargo,
      senha: "", // não preenche a senha para não expor
    })
    setEditandoId(usuario.id)
  }

  async function excluirUsuario(id) {
    const token = localStorage.getItem("token")
    if (confirm("Tem certeza que deseja excluir?")) {
      await deleteUsuario(id, token)
      carregarUsuarios()
    }
  }

  return (
    <div className="bg-white text-black rounded p-4 shadow-md max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Usuários</h2>

      {erro && <p className="text-red-600 mb-4">{erro}</p>}

      <form onSubmit={handleSubmit} className="space-y-2 mb-6 max-w-md">
        <input
          type="text"
          placeholder="Nome"
          className="input"
          value={form.nome}
          onChange={(e) => setForm({ ...form, nome: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="input"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <select
          className="input"
          value={form.cargo}
          onChange={(e) => setForm({ ...form, cargo: e.target.value })}
        >
          <option value="Admin">Admin</option>
          <option value="Barbeiro">Barbeiro</option>
          <option value="Cliente">Cliente</option>
        </select>
        <input
          type="password"
          placeholder={editandoId ? "Nova senha (opcional)" : "Senha"}
          className="input"
          value={form.senha}
          onChange={(e) => setForm({ ...form, senha: e.target.value })}
        />
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded w-full"
        >
          {editandoId ? "Atualizar" : "Cadastrar"}
        </button>
      </form>

      <table className="w-full text-left border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Nome</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Cargo</th>
            <th className="p-2 border">Criado Em</th>
            <th className="p-2 border">Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td className="p-2 border">{usuario.nome}</td>
              <td className="p-2 border">{usuario.email}</td>
              <td className="p-2 border">{usuario.cargo}</td>
              <td className="p-2 border">
                {new Date(usuario.criado_em).toLocaleString()}
              </td>
              <td className="p-2 border">
                <button
                  onClick={() => editarUsuario(usuario)}
                  className="mr-2 text-blue-600"
                >
                  ✏️
                </button>
                <button
                  onClick={() => excluirUsuario(usuario.id)}
                  className="text-red-600"
                >
                  ❌
                </button>
              </td>
            </tr>
          ))}
          {usuarios.length === 0 && (
            <tr>
              <td colSpan={5} className="p-2 border text-center text-gray-500">
                Nenhum usuário cadastrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

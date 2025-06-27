import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()
const SALT_ROUNDS = 10

export async function PUT(req, { params }) {
  try {
    const id = Number(params.id)
    const { nome, email, senha, cargo } = await req.json()

    const dadosAtualizacao = { nome, email, cargo }
    
    if (senha) {
      dadosAtualizacao.senha_hash = await bcrypt.hash(senha, SALT_ROUNDS)
    }

    const usuario = await prisma.usuario.update({
      where: { id },
      data: dadosAtualizacao,
    })

    return new Response(
      JSON.stringify({
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        cargo: usuario.cargo,
        criado_em: usuario.criado_em,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    )
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ erro: "Erro ao atualizar usuário" }), { status: 500 })
  }
}

export async function DELETE(req, { params }) {
  try {
    const id = Number(params.id)
    await prisma.usuario.delete({ where: { id } })

    return new Response(JSON.stringify({ mensagem: "Usuário deletado com sucesso" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ erro: "Erro ao deletar usuário" }), { status: 500 })
  }
}

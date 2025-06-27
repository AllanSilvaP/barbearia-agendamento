import { PrismaClient } from "@prisma/client"
import { verify } from "jsonwebtoken"

const prisma = new PrismaClient()

// Atualizar serviço (só Admin)
export async function PUT(req, { params }) {
  try {
    const authHeader = req.headers.get("authorization")
    const token = authHeader?.split(" ")[1]
    const payload = verify(token, process.env.JWT_SECRET)

    if (payload.cargo !== "Admin") {
      return Response.json({ erro: "Apenas Admins podem editar serviços" }, { status: 403 })
    }

    const { nome, descricao, preco, duracao_min } = await req.json()

    const servico = await prisma.servico.update({
      where: { id: Number(params.id) },
      data: { nome, descricao, preco: Number(preco), duracao_min: Number(duracao_min) },
    })

    return Response.json(servico)
  } catch (error) {
    console.error(error)
    return Response.json({ erro: "Erro ao atualizar" }, { status: 500 })
  }
}

// Deletar serviço (só Admin)
export async function DELETE(req, { params }) {
  try {
    const authHeader = req.headers.get("authorization")
    const token = authHeader?.split(" ")[1]
    const payload = verify(token, JWT_SECRET)

    if (payload.cargo !== "Admin") {
      return Response.json({ erro: "Apenas Admins podem deletar serviços" }, { status: 403 })
    }

    await prisma.servico.delete({
      where: { id: Number(params.id) },
    })

    return Response.json({ mensagem: "Serviço deletado com sucesso" })
  } catch (error) {
    console.error(error)
    return Response.json({ erro: "Erro ao deletar" }, { status: 500 })
  }
}

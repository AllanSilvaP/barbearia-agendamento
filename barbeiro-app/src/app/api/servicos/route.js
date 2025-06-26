import { PrismaClient } from "@prisma/client"
import { verify } from "jsonwebtoken"

const prisma = new PrismaClient()
const JWT_SECRET = process.env.JWT_SECRET

// Listar serviços
export async function GET() {
  const servicos = await prisma.servico.findMany()
  return Response.json(servicos)
}

// Criar novo serviço (só Admin)
export async function POST(req) {
  try {
    const authHeader = req.headers.get("authorization")
    const token = authHeader?.split(" ")[1]
    const payload = verify(token, JWT_SECRET)

    if (payload.cargo !== "Admin") {
      return Response.json({ erro: "Apenas Admins podem cadastrar serviços" }, { status: 403 })
    }

    const { nome, descricao, preco, duracao_min } = await req.json()

    if (!nome || preco == null || duracao_min == null) {
      return Response.json({ erro: "Campos obrigatórios ausentes" }, { status: 400 })
    }

    const servico = await prisma.servico.create({
      data: {
        nome,
        descricao,
        preco: Number(preco),
        duracao_min: Number(duracao_min),
      },
    })

    return Response.json(servico, { status: 201 })
  } catch (error) {
    console.error(error)
    return Response.json({ erro: "Erro interno" }, { status: 500 })
  }
}

import { PrismaClient } from "@prisma/client"
import jwt from "jsonwebtoken"

const prisma = new PrismaClient()
const SECRET = process.env.JWT_SECRET || "segredo-forte"

export async function GET(req) {
  const authHeader = req.headers.get("authorization")

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return new Response(JSON.stringify({ erro: "Token ausente" }), { status: 401 })
  }

  const token = authHeader.split(" ")[1]

  try {
    const payload = jwt.verify(token, SECRET)
    const usuario = await prisma.usuario.findUnique({
      where: { id: payload.id },
      select: {
        id: true,
        nome: true,
        email: true,
        cargo: true,
      },
    })

    if (!usuario) {
      return new Response(JSON.stringify({ erro: "Usuário não encontrado" }), { status: 404 })
    }

    return new Response(JSON.stringify(usuario), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Erro ao verificar token:", error)
    return new Response(JSON.stringify({ erro: "Token inválido ou expirado" }), { status: 401 })
  }
}

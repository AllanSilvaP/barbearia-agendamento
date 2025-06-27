import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()
const SALT_ROUNDS = 10

export async function GET() {
    try {
        const usuarios = await prisma.usuario.findMany({
            select: {
                id: true,
                nome: true,
                email: true,
                cargo: true,
                criado_em: true,
            },
            orderBy: {
                criado_em: "desc",
            },
        })

        return new Response(JSON.stringify(usuarios), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        })
    } catch (error) {
        console.error(error)
        return new Response(JSON.stringify({ erro: "Erro ao buscar usuários" }), { status: 500 })
    }
}

export async function POST(req) {
    try {
        const { nome, email, senha, cargo } = await req.json()

        if (!nome || !email || !senha || !cargo) {
            return new Response(JSON.stringify({ erro: "Campos obrigatórios faltando" }), { status: 400 })
        }

        const senha_hash = await bcrypt.hash(senha, SALT_ROUNDS)

        const usuario = await prisma.usuario.create({
            data: {
                nome,
                email,
                senha_hash,
                cargo,
            },
        })

        return new Response(
            JSON.stringify({
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                cargo: usuario.cargo,
                criado_em: usuario.criado_em,
            }),
            {
                status: 201,
                headers: { "Content-Type": "application/json" },
            }
        )
    } catch (error) {
        console.error(error)
        if (error.code === "P2002") { // Unique constraint fail
            return new Response(JSON.stringify({ erro: "Email já cadastrado" }), { status: 400 })
        }
        return new Response(JSON.stringify({ erro: "Erro ao criar usuário" }), { status: 500 })
    }
}

import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export default async function POST(req) {
    if(req.method !== 'POST') {
        return Response.status(405).json({ erro: 'Método não Permitido'})
    }
    const {nome, email, senha} = req.body

    if(!nome || !email || !senha) {
        return Response.status(400).json({erro: 'Nome, email e senha são obrigatórios' })
    }

    try {
        const existe = await prisma.usuario.findUnique({ where: {email}})
        if (existe) {
            return Response.status(400).json({ erro: 'Email já está em uso' })
        }

        const senha_hash = await bcrypt.hash(senha,10)

        const novoUsuario = await prisma.usuario.create({
            data: {
                nome,
                email,
                senha_hash,
                cargo:'Cliente'
            }
        })

        return Response.status(201).json({ mensagem: 'Usuário criado com sucesso'})
    } catch (error) {
        console.error(error)
        return Response.status(500).json({ erro: 'Erro ao registrar usuário' })
    }
}
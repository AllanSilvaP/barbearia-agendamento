import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const headers = {"Content-Type": "application/json"}

export async function POST(req) {
  const { email, senha } = await req.json(); // Correto no App Router

  if (!email || !senha) {
    return new Response(JSON.stringify({ erro: "Email e senha são obrigatórios" }), {
      status: 400,
      headers,
    });
  }

  try {
    const usuario = await prisma.usuario.findUnique({ where: { email } });

    if (!usuario) {
      return new Response(JSON.stringify({ erro: "Usuário não encontrado" }), {
        status: 400,
        headers,
      });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);

    if (!senhaValida) {
      return new Response(JSON.stringify({ erro: "Senha incorreta" }), {
        status: 401,
        headers,
      });
    }

    const token = jwt.sign(
      {
        id: usuario.id,
        email: usuario.email,
        cargo: usuario.cargo,
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    return new Response(
      JSON.stringify({
        mensagem: "Login realizado com sucesso",
        token,
        usuario: {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
          cargo: usuario.cargo,
        },
      }),
      {
        status: 200,
        headers,
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ erro: "Erro interno no servidor" }), {
      status: 500,
      headers,
    });
  }
}

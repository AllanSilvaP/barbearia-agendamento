import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const headers = {"Content-Type": "application/json"}

export async function POST(req) {
  const { nome, email, senha } = await req.json();

  if (!nome || !email || !senha) {
    return new Response(JSON.stringify({ erro: "Nome, email e senha são obrigatórios" }), {
      status: 400,
      headers,
    });
  }

  try {
    // Verifica se já existe um usuário com esse email
    const existe = await prisma.usuario.findUnique({ where: { email } });

    if (existe) {
      return new Response(JSON.stringify({ erro: "Email já está em uso" }), {
        status: 400,
        headers,
      });
    }

    // Criptografa a senha
    const senha_hash = await bcrypt.hash(senha, 10);

    // Cria o novo usuário como Cliente
    const novoUsuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        senha_hash,
        cargo: "Cliente",
      },
    });

    return new Response(
      JSON.stringify({
        mensagem: "Usuário criado com sucesso",
        usuario: {
          id: novoUsuario.id,
          nome: novoUsuario.nome,
          email: novoUsuario.email,
          cargo: novoUsuario.cargo,
        },
      }),
      {
        status: 201,
        headers,
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ erro: "Erro ao registrar usuário" }), {
      status: 500,
      headers,
    });
  }
}

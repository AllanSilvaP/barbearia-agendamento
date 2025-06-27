import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const SECRET = process.env.JWT_SECRET || "segredo-forte";

export async function PATCH(req, { params }) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return new Response(JSON.stringify({ erro: "Token ausente" }), { status: 401 });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, SECRET);

    const { id } = params;
    const { status } = await req.json();

    if (!["confirmado", "cancelado", "pendente"].includes(status)) {
      return new Response(JSON.stringify({ erro: "Status inválido" }), { status: 400 });
    }

    const agendamento = await prisma.agendamento.update({
      where: { id: Number(id) },
      data: { status }
    });

    return new Response(JSON.stringify(agendamento), { status: 200 });
  } catch (error) {
    console.error("Erro ao atualizar status:", error);
    return new Response(JSON.stringify({ erro: "Token inválido ou erro interno" }), { status: 401 });
  }
}


import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function POST(req) {
  try {
    const body = await req.json()
    const { cliente_id, barbeiro_id, servico_id, data_hora, observacoes } = body

    // Validação básica
    if (!cliente_id || !barbeiro_id || !servico_id || !data_hora) {
      return Response.json({ erro: "Campos obrigatórios ausentes" }, { status: 400 })
    }

    const novoAgendamento = await prisma.agendamento.create({
      data: {
        cliente_id: Number(cliente_id),
        barbeiro_id: Number(barbeiro_id),
        servico_id: Number(servico_id),
        data_hora: new Date(data_hora),
        observacoes: observacoes || null,
      }
    })

    return Response.json(novoAgendamento, { status: 201 })
  } catch (error) {
    console.error("Erro ao agendar:", error)
    return Response.json({ erro: "Erro interno ao agendar" }, { status: 500 })
  }
}

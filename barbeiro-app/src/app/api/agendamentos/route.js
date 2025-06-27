import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const barbeiro_id = Number(searchParams.get("barbeiro_id"))
  const data = searchParams.get("data")

  if (!barbeiro_id || !data) {
    return Response.json({ erro: "barbeiro_id e data são obrigatórios" }, { status: 400 })
  }

  try {
    const agendamentos = await prisma.agendamento.findMany({
      where: {
        barbeiro_id,
        data_hora: {
          gte: new Date(`${data}T00:00:00`),
          lt: new Date(`${data}T23:59:59`)
        }
      },
      include: {
        cliente: true,
        servico: true
      }
    })

    return Response.json(agendamentos)
  } catch (error) {
    console.error("Erro ao buscar agenda:", error)
    return Response.json({ erro: "Erro interno ao buscar agenda" }, { status: 500 })
  }
}

export async function POST(req) {
  try {
    const body = await req.json()
    const {
      barbeiroId,
      data,
      horario,
      servicoId,
      nomeCliente,
      emailCliente,
    } = body

    if (!barbeiroId || !data || !horario || !servicoId || !nomeCliente || !emailCliente) {
      return Response.json({ erro: "Campos obrigatórios ausentes" }, { status: 400 })
    }

    const dataHora = new Date(`${data}T${horario}`)

    const cliente = await prisma.usuario.upsert({
      where: { email: emailCliente },
      update: { nome: nomeCliente },
      create: {
        nome: nomeCliente,
        email: emailCliente,
        senha_hash: "placeholder", // ajustar depois
        cargo: "Cliente",
      },
    })

    const agendamento = await prisma.agendamento.create({
      data: {
        barbeiro_id: barbeiroId,
        cliente_id: cliente.id,
        servico_id: servicoId,
        data_hora: dataHora,
        status: "pendente",
      },
    })

    return Response.json({ mensagem: "Agendamento criado com sucesso", agendamento }, { status: 201 })
  } catch (error) {
    console.error("Erro ao criar agendamento:", error)
    return Response.json({ erro: "Erro interno no servidor" }, { status: 500 })
  }
}

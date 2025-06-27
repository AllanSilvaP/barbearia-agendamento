// services/ApiAgendamentos.js
export async function createAgendamento(dados, token) {
    const res = await fetch("/api/agendamentos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dados),
    })

    if (!res.ok) {
        throw new Error("Erro ao criar agendamento")
    }

    return res.json()
}

export async function getAgenda(barbeiro_id, data) {
  const res = await fetch(`/api/agendamentos?barbeiro_id=${barbeiro_id}&data=${data}`)
  if (!res.ok) throw new Error("Erro ao carregar agenda")
  return res.json()
}

export async function atualizarStatusAgendamento(id, status, token) {
  const res = await fetch(`/api/agendamentos/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ status })
  });

  if (!res.ok) throw new Error("Erro ao atualizar status");

  return res.json();
}

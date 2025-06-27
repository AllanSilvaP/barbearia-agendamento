export async function getServicos() {
  const res = await fetch("/api/servicos")
  return res.json()
}

export async function createServico(dados, token) {
  const res = await fetch("/api/servicos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(dados),
  })
  return res.json()
}

export async function updateServico(id, dados, token) {
  const res = await fetch(`/api/servicos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(dados),
  })
  return res.json()
}

export async function deleteServico(id, token) {
  const res = await fetch(`/api/servicos/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    },
  })
  return res.json()
}

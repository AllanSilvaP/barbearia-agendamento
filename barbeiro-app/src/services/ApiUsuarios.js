export async function getUsuarios() {
  const res = await fetch("/api/usuarios")
  return res.json()
}

export async function createUsuario(dados, token) {
  const res = await fetch("/api/usuarios", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(dados),
  })
  return res.json()
}

export async function updateUsuario(id, dados, token) {
  const res = await fetch(`/api/usuarios/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(dados),
  })
  return res.json()
}

export async function deleteUsuario(id, token) {
  const res = await fetch(`/api/usuarios/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return res.json()
}

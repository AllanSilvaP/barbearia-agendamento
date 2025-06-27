"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AuthGuard({ children, permitido }) {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    const usuario = JSON.parse(localStorage.getItem("usuario"))

    if (!token || !usuario) {
      router.push("/login")
      return
    }

    // Verifica se o cargo do usuário está entre os permitidos
    if (!permitido.includes(usuario.cargo)) {
      router.push("/login")
    }

  }, [permitido, router])

  return children
}

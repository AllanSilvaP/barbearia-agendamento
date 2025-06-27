'use client'

import AuthGuard from "@/components/AuthGuard";
import Navbar from "@/components/Navbar";
import SelecionarDia from "@/components/SelecionarDias";
import AgendaCliente from "@/components/AgendaCliente";
import BarraLateral from "@/components/BarraLateral";
import { useEffect, useState } from "react";
import { getAgenda, updateStatusAgendamento } from "@/services/ApiAgendamentos";
import { getPerfil } from "@/services/ApiUsuarios";

export default function HubBarbeiro() {
  const [perfil, setPerfil] = useState(null)
  const [diasDisponiveis, setDiasDisponiveis] = useState([])
  const [indiceDiaSelecionado, setIndiceDiaSelecionado] = useState(0)
  const [horarios, setHorarios] = useState([])

  const dataSelecionada = diasDisponiveis[indiceDiaSelecionado]?.data

  useEffect(() => {
    async function carregarPerfil() {
      const token = localStorage.getItem("token")
      try {
        const dados = await getPerfil(token)
        setPerfil(dados)
      } catch (err) {
        console.error("Erro ao buscar perfil:", err)
      }
    }
    carregarPerfil()
  }, [])

  useEffect(() => {
    if (!perfil || !dataSelecionada) return

    async function carregarAgenda() {
      try {
        const dataFormatada = new Date(dataSelecionada).toISOString().split("T")[0]
        const resposta = await getAgenda(perfil.id, dataFormatada)
        setHorarios(resposta)
      } catch (err) {
        console.error("Erro ao carregar agenda:", err)
      }
    }
    carregarAgenda()
  }, [perfil, dataSelecionada])

  async function confirmarAgendamento(id) {
    try {
      await updateAgendamento(id, { status: "confirmado" })
      setHorarios(horarios.map(a => a.id === id ? { ...a, status: "confirmado" } : a))
    } catch (err) {
      console.error("Erro ao confirmar:", err)
    }
  }

  return (
    <AuthGuard permitido={["Barbeiro"]}>
      <Navbar />
      <main className="bg-[#2E2B2A] min-h-screen text-white">
        <h1 className="text-3xl text-center pt-8">Minha Agenda</h1>

        <div className="flex justify-center px-4 py-8">
          <SelecionarDia
            indiceSelecionado={indiceDiaSelecionado}
            setIndiceSelecionado={setIndiceDiaSelecionado}
            dias={diasDisponiveis}
            setDias={setDiasDisponiveis}
          />
        </div>

        <div className="w-[600px] h-[3px] bg-white opacity-50 mx-auto" />

        <div className="max-w-screen-xl mx-auto flex w-full px-4 m-6 min-h-[500px]">
          <div className="w-3/4 pr-4">
            <AgendaCliente
              barbeiroSelecionado={perfil}
              dataSelecionada={dataSelecionada}
              horarios={horarios}
              onConfirmar={confirmarAgendamento} // só vai funcionar se o AgendaCliente usar isso
            />
          </div>

          <div className="w-1/4 pl-4">
            <BarraLateral titulo="Painel do Barbeiro" valoresBt={["Confirmar Agendamento"]}/>
          </div>
        </div>
      </main>
    </AuthGuard>
  )
}
'use client'

import { useState } from "react";
import AuthGuard from "@/components/AuthGuard";
import Navbar from "@/components/Navbar";
import CardAgendamento from "@/components/CardAgendamento";
import AgendaCliente from "@/components/AgendaCliente";
import BarraLateral from "@/components/BarraLateral";
import SelecionarDia from "@/components/SelecionarDias";
import HubServicos from "@/components/HubServicos";
import HubContas from "@/components/HubGontas";

export default function hubcliente() {

    const [conteudo, setConteudo] = useState("Agendamentos")
    const [indiceDiaSelecionado, setIndiceDiaSelecionado] = useState(0)
    const [diasDisponiveis, setDiasDisponiveis] = useState([])

    function renderConteudo() {
        switch (conteudo) {
            case "Serviços":
                return <HubServicos />
            case "Contas":
                return <HubContas />
            case "Agendamentos":
            default:
                return <AgendaCliente />
        }
    }
    return (
        <AuthGuard permitido={["Admin"]}>
            <Navbar />
            <main className="bg-[#2E2B2A] min-h-screen text-white">
                <h1 className="text-3xl text-center pt-8">Seja bem vindo</h1>

                <div className="flex justify-center px-4 py-8">
                    <SelecionarDia
                        indiceSelecionado={indiceDiaSelecionado}
                        setIndiceSelecionado={setIndiceDiaSelecionado}
                        dias={diasDisponiveis}
                        setDias={setDiasDisponiveis}
                    />
                </div>

                {/* Barra horizontal */}
                <div className="w-[600px] h-[3px] bg-white opacity-50 mx-auto" />

                {/* Grade Agenda + Lateral com altura preenchida */}
                <div className="max-w-screen-xl mx-auto flex w-full px-4 m-6 min-h-[500px]">
                    <div className="w-3/4 pr-4">
                        {renderConteudo()}
                    </div>
                    <div className="w-1/4 pl-4">
                        <BarraLateral
                            titulo="Voltar"
                            valoresBt={["Contas", "Serviços", "Agendamentos"]}
                            onBotaoClick={setConteudo}
                        />
                    </div>
                </div>
            </main>
        </AuthGuard>
    );
}

'use client'

import AuthGuard from "@/components/AuthGuard";
import Navbar from "@/components/Navbar";
import CardAgendamento from "@/components/CardAgendamento";
import AgendaCliente from "@/components/AgendaCliente";
import BarraLateral from "@/components/BarraLateral";
import SelecionarDia from "@/components/SelecionarDias";
import FormAgendamento from "@/components/FormAgendamento"
import { useEffect, useState } from "react";
import { getUsuarios } from "@/services/ApiUsuarios";
import { getAgenda } from "@/services/ApiAgendamentos";

export default function hubcliente() {
    const [formAberto, setFormAberto] = useState(false)
    const [barbeiros, setBarbeiros] = useState([])
    const [barbeiroSelecionado, setBarbeiroSelecionado] = useState(null)
    const [indiceDiaSelecionado, setIndiceDiaSelecionado] = useState(0)
    const [diasDisponiveis, setDiasDisponiveis] = useState([])
    const [dataSelecionada, setDataSelecionada] = useState(null)
    const [horarios, setHorarios] = useState([])



    const dataSelecionadaSegura = diasDisponiveis[indiceDiaSelecionado]?.data

    useEffect(() => {
        if (!barbeiroSelecionado || !dataSelecionadaSegura) return;

        async function carregarAgenda() {
            try {
                const dataFormatada = new Date(dataSelecionadaSegura).toISOString().split("T")[0];
                const resposta = await getAgenda(barbeiroSelecionado.id, dataFormatada);
                setHorarios(resposta);
            } catch (error) {
                console.error("Erro ao carregar agenda:", error);
            }
        }

        carregarAgenda();
    }, [barbeiroSelecionado, indiceDiaSelecionado, diasDisponiveis]);



    useEffect(() => {
        async function carregarBarbeiros() {
            const todos = await getUsuarios()
            const filtrados = todos.filter(user => user.cargo === "Barbeiro")
            setBarbeiros(filtrados)
        }
        carregarBarbeiros()
    }, [])

    return (
        <AuthGuard permitido={["Cliente", "Admin"]}>
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

                <div className="flex justify-center py-4"> {/* Added a div to center the button */}
                    <button
                        disabled={!barbeiroSelecionado}
                        onClick={() => setFormAberto(true)}
                        className={`py-2 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out 
        ${!barbeiroSelecionado ? "bg-gray-400 cursor-not-allowed" : "bg-[#8B5F2A] hover:bg-[#A07C42] text-white"}
    `}
                    >
                        Agendar Corte
                    </button>
                </div>

                {/* Grade Agenda + Lateral com altura preenchida */}
                <div className="max-w-screen-xl mx-auto flex w-full px-4 m-6 min-h-[500px]">
                    <div className="w-3/4 pr-4">
                        <AgendaCliente
                            barbeiroSelecionado={barbeiroSelecionado}
                            dataSelecionada={diasDisponiveis[indiceDiaSelecionado]?.data}
                            horarios={horarios}
                        />
                    </div>
                    <div className="w-1/4 pl-4">
                        <BarraLateral
                            titulo={"Barbeiros Disponíveis"}
                            valoresBt={barbeiros.map(b => b.nome)}
                            onBotaoClick={(nomeSelecionado) => {
                                const barbeiro = barbeiros.find(b => b.nome === nomeSelecionado)
                                setBarbeiroSelecionado(barbeiro)
                            }}
                        />
                    </div>
                </div>
            </main>
            {formAberto && barbeiroSelecionado && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white text-black p-6 rounded-lg shadow-lg w-full max-w-md relative">
                        <button
                            onClick={() => setFormAberto(false)}
                            className="absolute top-2 right-3 text-red-500 text-xl hover:text-red-700"
                        >
                            &times;
                        </button>
                        <FormAgendamento
                            barbeiro={barbeiroSelecionado}
                            data={diasDisponiveis[indiceDiaSelecionado]?.data}
                            onFechar={() => setFormAberto(false)}
                        />
                    </div>
                </div>
            )}

        </AuthGuard>
    );
}

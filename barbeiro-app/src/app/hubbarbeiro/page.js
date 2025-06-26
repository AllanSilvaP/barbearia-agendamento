'use client'

import AuthGuard from "@/components/AuthGuard";
import Navbar from "@/components/Navbar";
import CardAgendamento from "@/components/CardAgendamento";
import AgendaCliente from "@/components/AgendaCliente";
import BarraLateral from "@/components/BarraLateral";
import SelecionarDia from "@/components/SelecionarDias";

export default function hubcliente() {
    return (
        <AuthGuard permitido={["Barbeiro"]}>
            <Navbar />
            <main className="bg-[#2E2B2A] min-h-screen text-white">
                <h1 className="text-3xl text-center pt-8">Seja bem vindo -Usuario-</h1>

                <div className="flex justify-center px-4 py-8">
                    <SelecionarDia />
                </div>

                {/* Barra horizontal */}
                <div className="w-[600px] h-[3px] bg-white opacity-50 mx-auto" />

                {/* Grade Agenda + Lateral com altura preenchida */}
                <div className="max-w-screen-xl mx-auto flex w-full px-4 m-6 min-h-[500px]">
                    <div className="w-3/4 pr-4">
                        <AgendaCliente />
                    </div>
                    <div className="w-1/4 pl-4">
                        <BarraLateral titulo={"Administrar"} />
                    </div>
                </div>
            </main>
        </AuthGuard>
    );
}

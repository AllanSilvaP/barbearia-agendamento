"use client"

import { atualizarStatusAgendamento } from "@/services/ApiAgendamentos"

export default function AgendaCliente({ barbeiroSelecionado, dataSelecionada, horarios = [] }) {
    if (!barbeiroSelecionado || !dataSelecionada) {
        return <p className="text-center">Selecione um barbeiro e uma data para ver a agenda</p>
    }

    console.log("Horários recebidos no AgendaCliente:", horarios)

    const agendamentosComHora = horarios.map(item => ({
        ...item,
        hora: new Date(item.data_hora).toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit"
        }),
    }))

    async function confirmarAgendamento(id) {
        const token = localStorage.getItem("token");
        try {
            await atualizarStatusAgendamento(id, "confirmado", token);
            alert("Agendamento confirmado!");
            location.reload(); // ou recarregue a lista de horários manualmente
        } catch (error) {
            console.error("Erro ao confirmar:", error);
            alert("Erro ao confirmar agendamento");
        }
    }


    return (
        <div className="bg-black text-white p-4 w-full overflow-x-auto rounded-lg">
            <h2 className="text-center text-lg mb-4">
                {barbeiroSelecionado.nome}
            </h2>

            <div className="space-y-2">
                {agendamentosComHora.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                        <div className="w-16 text-right pr-2 text-blue-400 font-mono">
                            {item.hora}
                        </div>
                        <div className={`flex-1 rounded px-2 py-1 text-sm font-semibold
                            ${item.status === "cancelado" ? "bg-red-600" :
                                item.status === "confirmado" ? "bg-green-600" :
                                    "bg-yellow-500 text-black text-center"}`}>
                            {item.status.toUpperCase()}

                            {item.status === "pendente" && (
                                <button
                                    onClick={() => confirmarAgendamento(item.id)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-sm"
                                >
                                    Confirmar
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}

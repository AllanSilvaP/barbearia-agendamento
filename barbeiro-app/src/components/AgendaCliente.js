export default function AgendaCliente() {
    const horarios = [
        { hora: "09:00", status: "LIVRE" },
        { hora: "09:30", status: "CLODOALDO - CORTE", tipo: "ocupado" },
        { hora: "10:00", status: "LIVRE" },
        { hora: "11:10", status: "RENAN - BARBA", tipo: "ocupado" },
        { hora: "12:00", status: "HORÁRIO DE ALMOÇO", tipo: "almoco" },
        { hora: "13:00", status: "LEANDRO - LIMPEZA DE PELE", tipo: "ocupado" },
        { hora: "14:00", status: "LIVRE" },
        { hora: "15:00", status: "LIVRE" },
        { hora: "16:00", status: "LIVRE" },
        { hora: "17:00", status: "FABRICIO - ALISAMENTO", tipo: "ocupado" },
    ];

    return (
        <div className="bg-black text-white p-4 w-full overflow-x-auto rounded-lg">
            <h2 className="text-center text-lg mb-4">
                {'{VARIAVEL BARBEIRO, DIA E NOME DIA}'}
            </h2>

            <div className="space-y-2">
                {horarios.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                        <div className="w-16 text-right pr-2 text-blue-400 font-mono">
                            {item.hora}
                        </div>
                        <div className={`
                            flex-1 rounded px-2 py-1 text-sm font-semibold
                            ${item.tipo === "ocupado" ? "bg-red-600" :
                                item.tipo === "almoco" ? "bg-yellow-500 text-black text-center" :
                                    "bg-green-600"}
                        `}>
                            {item.status}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

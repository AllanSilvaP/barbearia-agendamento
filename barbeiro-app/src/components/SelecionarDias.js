import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function gerarDiasProximos() {
    const dias = [];
    const hoje = new Date();

    for (let i = 0; i < 30; i++) {
        const data = new Date(hoje);
        data.setDate(data.getDate() + i);

        const dia = data.getDate().toString().padStart(2, "0");
        const semana = data.toLocaleDateString("pt-BR", { weekday: "long" });

        dias.push({
            data: data,
            dia,
            semana: semana.charAt(0).toUpperCase() + semana.slice(1),
        });
    }

    return dias;
}

export default function SelecionarDia({ indiceSelecionado, setIndiceSelecionado, dias, setDias }) {
    const [janelaInicio, setJanelaInicio] = useState(0);

    useEffect(() => {
        const diasGerados = gerarDiasProximos();
        setDias(diasGerados);
    }, [setDias]);

    
    const moverJanela = (direcao) => {
        setJanelaInicio((prev) => {
            if (direcao === "esquerda") return Math.max(prev - 1, 0);
            if (direcao === "direita") return Math.min(prev + 1, dias.length - 3);
            return prev;
        });
    };

    const diasVisiveis = (dias || []).slice(janelaInicio, janelaInicio + 3);

    return (
        <div className="flex items-center justify-center space-x-4 py-4">
            <button
                onClick={() => moverJanela("esquerda")}
                disabled={janelaInicio === 0}
                className="text-white hover:text-gray-400"
            >
                <ChevronLeft size={32} />
            </button>

            <div className="flex space-x-4">
                {diasVisiveis.map((dia, index) => {
                    const indiceGlobal = janelaInicio + index;
                    const selecionado = indiceGlobal === indiceSelecionado;
                    return (
                        <div
                            key={indiceGlobal}
                            onClick={() => setIndiceSelecionado(indiceGlobal)}
                            className={`flex flex-col items-center justify-center cursor-pointer transition-all duration-300
                                rounded-xl px-6 py-4 text-center
                                ${selecionado
                                    ? "bg-white text-black scale-110 font-bold shadow-lg"
                                    : "bg-black text-white opacity-70"
                                }`}
                        >
                            <span className="text-2xl">{dia.dia}</span>
                            <span className="text-sm uppercase leading-tight">{dia.semana}</span>
                        </div>
                    );
                })}
            </div>

            <button
                onClick={() => moverJanela("direita")}
                disabled={janelaInicio + 3 >= dias.length}
                className="text-white hover:text-gray-400"
            >
                <ChevronRight size={32} />
            </button>
        </div>
    );
}

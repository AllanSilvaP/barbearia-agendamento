import React from "react";
import BotaoHubs from "./BotaoHubs";

export default function LinhaTabela({ servico, onEditar, onDeletar, acoesExtra }) {
    return (
        <tr className="hover:bg-gray-50">
            <td className="border px-4 py-2">{servico.nome}</td>
            <td className="border px-4 py-2">{servico.descricao}</td>
            <td className="border px-4 py-2">R$ {Number(servico.preco).toFixed(2)}</td>
            <td className="border px-4 py-2">{servico.duracao_min} min</td>
            <td className="border px-4 py-2">
                <div className="flex justify-end gap-2">
                    <BotaoHubs
                        titulo="✏️"
                        onClick={() => onEditar(servico)}
                    />
                    <BotaoHubs
                        titulo="❌"
                        onClick={() => onDeletar(servico)}
                    />
                    {acoesExtra}
                </div>
            </td>
        </tr>
    );
}

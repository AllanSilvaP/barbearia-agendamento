'use client'

import BotaoHubs from "./BotaoHubs"

export default function HubServicos () {
    return (
        <div className="bg-black text-white p-6 rounded-xl shadow-lg m-4 max-w-full overflow-x-auto font-sans">
            <h2 className="text-center text-3xl mb-6">
                Serviços
            </h2>
            <div className="mb-6 flex justify-center">
                <BotaoHubs titulo="Adicionar Serviço"/>
            </div>

            <table className="w-full text-left table-auto rounded-lg overflow-hidden">
                <thead className="bg-gray-700">
                    <tr>
                        <th className="px-4 py-3 font-semibold text-lg rounded-tl-lg">Nome</th>
                        <th className="px-4 py-3 font-semibold text-lg">Descrição</th>
                        <th className="px-4 py-3 font-semibold text-lg">Preço</th>
                        <th className="px-4 py-3 font-semibold text-lg">Duração</th>
                        <th className="px-4 py-3 font-semibold text-lg rounded-tr-lg">Ações</th>
                    </tr>
                </thead>

                <tbody>
                    {/* Linhas da tabela serão adicionadas aqui por outra lógica */}
                </tbody>
            </table>
        </div>
    )
}
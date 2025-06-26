import BotaoBarraLateral from "./BotaoBarraLateral";

export default function BarraLateral({ titulo = '' , valoresBt = [], onBotaoClick}) {
    return (
        <div className="p-4 bg-gray-800 text-white rounded shadow-md w-full">
            <h2 className="text-xl mb-4 text-center">{titulo}</h2>

            <div className="flex flex-col space-y-2">
                {valoresBt.map((valor, index) => (
                    <BotaoBarraLateral key={index} valor={valor} onClick={onBotaoClick}/>
                ))}

            </div>
        </div>
    );
}

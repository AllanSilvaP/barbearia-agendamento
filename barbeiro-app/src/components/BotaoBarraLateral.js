export default function BotaoBarraLateral({ valor, onClick }) {
    return (
        <button 
        onClick={() => onClick(valor)}
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
        {valor}
        </button>
    )
}
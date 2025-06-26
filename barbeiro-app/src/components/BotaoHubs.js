export default function BotaoHubs ({titulo="", onClick}) {
    return (
        <button
        className="bg-[#4B2E2B] hover:bg-[#A9745B] text-white py-2 px-4 rounded"

        >
            {titulo}
        </button>
    )
}
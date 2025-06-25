export default function BarraLateral({ titulo = '' , valoresBt = ['']}) {
    return (
        <div className="p-4 bg-gray-800 text-white rounded shadow-md w-full">
            <h2 className="text-xl mb-4 text-center">{titulo}</h2>

            <div className="flex flex-col space-y-2">
                <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
                    Barbeiro1
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
                    Barbeiro2
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
                    Barbeiro3
                </button>
            </div>
        </div>
    );
}

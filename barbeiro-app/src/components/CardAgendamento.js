export default function CardAgendamento({ titulo, valor }) {
  return (
    <div className="bg-grey-700 rounded-xl shadow-md p-6 w-48 h-[120px] text-center hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-bold text-gray-800 mb-2 text-white">{titulo}</h3>
      <p className="text-lg text-gray-600 text-white">{valor}</p>
    </div>
  );
}

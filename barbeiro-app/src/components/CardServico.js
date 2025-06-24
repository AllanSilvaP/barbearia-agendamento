export default function CardServico({ titulo, valor }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-48 text-center hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-bold text-gray-800 mb-2">{titulo}</h3>
      <p className="text-lg text-gray-600">{valor}</p>
    </div>
  );
}

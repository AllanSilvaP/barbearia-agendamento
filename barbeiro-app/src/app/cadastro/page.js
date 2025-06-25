import Navbar from "@/components/Navbar";

export default function LoginPage() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen flex flex-col items-center justify-center bg-[#D7CCC8]">
                <h1 className="font-bold text-3xl mb-6">Cadastro</h1>
                <form className="bg-[#808080] shadow-md rounded px-8 pt-6 pb-8 w-full max-w-sm">
                    <div className="mb-4">
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Email"
                        ></input>
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Senha"
                        ></input>
                    </div>
                    <div className="mb-6">
                        <input
                            type="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Confirme sua senha"
                        ></input>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-black text-white font-bold py-2 px-4 rounded hover:bg-gray-800"
                    >Cadastrar</button>

                </form>
            </main>
        </>
    )
}
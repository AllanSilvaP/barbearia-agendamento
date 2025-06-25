import Navbar from "@/components/Navbar";
import CardAgendamento from "@/components/CardAgendamento";

export default function hubcliente() {
    return (
        <>
            <Navbar />
            <main className="bg-[#2E2B2A] min-h-screen">
                <h1 className="text-3xl text-center pt-8">Seja bem vindo -Usuario-</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 py-8 justify-items-center">
                    <CardAgendamento titulo={"24"} valor={"Quarta"}/>
                    <CardAgendamento titulo={"24"} valor={"Quarta"}/>
                    <CardAgendamento titulo={"24"} valor={"Quarta"}/>
                    <CardAgendamento titulo={"24"} valor={"Quarta"}/>
                    <CardAgendamento titulo={"24"} valor={"Quarta"}/>
                    <CardAgendamento titulo={"24"} valor={"Quarta"}/>
                </div>

                {/* Barra horizontal */}
                <div className="w-[600px] h-[3px] bg-white opacity-50 mx-auto" />
            </main>
        </>
    )
}
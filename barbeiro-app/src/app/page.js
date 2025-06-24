import Image from "next/image";
import Navbar from "@/components/Navbar"
import CardServico from "@/components/CardServico";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="bg-[#808080] min-h-screen">
        <section>
          <video
            className="w-full h-auto object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/video-barbeiro.mp4" type="video/mp4" />
            Seu navegador não suporta a tag video
          </video>
        </section>
        <h2 className="text-center text-3xl font-bold mt-8 text-white">Barbearia Aguia Real</h2>

        <div className="flex items-center gap-6 px-4 py-8">
          {/* Imagem */}
          <Image
            src="/HubPageBarba.jpg"
            alt="Barba"
            width={300}
            height={150}
            className="object-cover rounded-lg"
          />

          {/* Barra vertical */}
          <div className="w-[10px] h-[250px] bg-white opacity-50" />

          {/* Texto */}
          <p className="max-w-2xl text-white leading-relaxed font-sans text-justify">
            Na barbearia Águia Real, cada corte é uma experiência. Aqui, combinamos técnicas clássicas com as tendências mais atuais para valorizar o seu estilo e sua personalidade. 💈 Cortes masculinos, barba desenhada, cuidados com a pele e mais. ✂️ Atendimento personalizado em um ambiente confortável e descontraído. 📍 Visite-nos ou agende seu horário online e sinta a diferença! Seu estilo começa aqui. Agende agora e viva a experiência de um verdadeiro atendimento de barbearia.
          </p>
        </div>

        <h2 className="text-center text-3xl font-bold mt-8 text-white">Servicos</h2>

        {/* Barra horizontal */}
        <div className="w-[300px] h-[3px] bg-white opacity-50 flex items-center" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 py-8 justify-items-center">
          <CardServico titulo={'Corte'} valor={'R$35'}/>
          <CardServico titulo={'Barba'} valor={'R$35'}/>
          <CardServico titulo={'Sombrancelha'} valor={'R$10'}/>
          <CardServico titulo={'Luzes'} valor={'R$100'}/>
          <CardServico titulo={'Alinhamento + Corte'} valor={'R$120'}/>
          <CardServico titulo={'Descoloração'} valor={'R$200'}/>
        </div>
      </main>
    </>
  );
}

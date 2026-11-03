'use client'

import Header from "./components/header";
import SectionHero from "./components/sectionHero";
import SectionHeading from "./components/sectionHeading";
import Footer from "./components/footer";
import NumeroAleatorio from "./components/numeroAleatorio";
import LogicaComJS from "./components/tituloLogica";
import Login from "./components/login";
import { useAutenticacao } from "./hooks/useAutenticacao";

export default function Home() {
  const { autenticado, erro, sucesso, fazerLogin, cadastrar, fazerLogout } = useAutenticacao();

  return (
    <>
      <Header autenticado={autenticado} onLogout={fazerLogout} />

      <main>
        {!autenticado ? (
          <Login 
            onLogin={fazerLogin} 
            onCadastrar={cadastrar} 
            erro={erro} 
            sucesso={sucesso} 
          />
        ) : (
          <>
            <SectionHero />
            <SectionHeading />
            <LogicaComJS />
            <NumeroAleatorio titulo="Sorteador de Números" minPadrao={1} maxPadrao={100} />
          </>
        )}
      </main>

      <Footer />
    </>
  );
}
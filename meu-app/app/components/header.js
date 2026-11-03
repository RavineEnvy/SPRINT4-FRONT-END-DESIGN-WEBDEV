'use client'

import { useState, useEffect } from 'react'

export default function Headering({ autenticado, onLogout }) {
  const [hora, setHora] = useState(new Date());
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setHora(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark');
      setIsDark(true);
    }
  }, []);

  const toggleTheme = (e) => {
    e.preventDefault();
    const novoTema = !isDark;
    setIsDark(novoTema);
    
    if (novoTema) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <header className="header">
        <a className="logo" href="#">
            FILMA<span>.AI</span> 
        </a>

        <nav className="menu">
            <a className="tema" href="#tema" onClick={toggleTheme} aria-label="Alternar Tema">
              <img src="/tema.png" alt="Tema"/>
            </a>
            {autenticado && (
              <>
                <a href="#inicio">Início</a>
                <a href="#projetos">Projetos</a>
                <a href="#sobre">Sobre</a>
                <a href="#contato">Contato</a>
                <button onClick={onLogout} className="logout-button">
                  Sair
                </button>
              </>
            )}
            <p>{hora.toLocaleTimeString()}</p>
        </nav>
    </header>
  );
}
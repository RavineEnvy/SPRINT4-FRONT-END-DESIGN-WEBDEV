'use client'

import { useState } from 'react';

export default function Login({ onLogin, onCadastrar, erro, sucesso }) {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [isRegistro, setIsRegistro] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegistro) {
      const criado = onCadastrar(usuario, senha);
      if (criado) {
        setIsRegistro(false);
        setSenha('');
      }
    } else {
      onLogin(usuario, senha);
    }
  };

  return (
    <section className="section login-section">
      <div className="login-card">
        <h2 className="login-title">
          {isRegistro ? 'Criar Conta' : 'Login'} <span>FILMA.AI</span>
        </h2>
        <p className="login-desc">
          {isRegistro 
            ? 'Registe um novo utilizador para aceder ao sistema.' 
            : 'Entre com as suas credenciais ou crie uma conta.'}
        </p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-field">
            <label htmlFor="usuario">Usuário:</label>
            <input 
              id="usuario"
              type="text" 
              value={usuario} 
              onChange={(e) => setUsuario(e.target.value)} 
              placeholder="Ex: admin"
              required
            />
          </div>

          <div className="login-field">
            <label htmlFor="senha">Senha:</label>
            <input 
              id="senha"
              type="password" 
              value={senha} 
              onChange={(e) => setSenha(e.target.value)} 
              placeholder="Ex: 123456"
              required
            />
          </div>

          {erro && <p className="login-error">{erro}</p>}
          {sucesso && <p className="login-success">{sucesso}</p>}

          <button type="submit" className="button login-button">
            {isRegistro ? 'Cadastrar Conta' : 'Entrar no Sistema'}
          </button>

          <div className="login-toggle-container">
            <button 
              type="button" 
              className="login-toggle-btn"
              onClick={() => {
                setIsRegistro(!isRegistro);
                setUsuario('');
                setSenha('');
              }}
            >
              {isRegistro ? 'Já tem uma conta? Faça login' : 'Não tem conta? Cadastre-se'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
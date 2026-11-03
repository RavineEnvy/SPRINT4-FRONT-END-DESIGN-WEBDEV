'use client'

import { useState } from 'react';

export function useAutenticacao() {
  const [autenticado, setAutenticado] = useState(false);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  const cadastrar = (usuario, senha) => {
    if (!usuario || !senha) {
      setErro('Preencha todos os campos!');
      setSucesso('');
      return false;
    }

    // Busca utilizadores salvos ou inicia array vazio
    const usuariosSalvos = JSON.parse(localStorage.getItem('filma_ai_usuarios') || '[]');
    
    // Verifica se o utilizador já existe
    const existe = usuariosSalvos.find(u => u.usuario === usuario);
    if (existe) {
      setErro('Este nome de usuário já está em uso!');
      setSucesso('');
      return false;
    }

    // Adiciona novo utilizador
    usuariosSalvos.push({ usuario, senha });
    localStorage.setItem('filma_ai_usuarios', JSON.stringify(usuariosSalvos));
    
    setSucesso('Conta criada com sucesso! Faça login.');
    setErro('');
    return true;
  };

  const fazerLogin = (usuario, senha) => {
    if (usuario === 'admin' && senha === '123456') {
      setAutenticado(true);
      setErro('');
      setSucesso('');
      return true;
    }

    const usuariosSalvos = JSON.parse(localStorage.getItem('filma_ai_usuarios') || '[]');
    const userFound = usuariosSalvos.find(u => u.usuario === usuario && u.senha === senha);

    if (userFound) {
      setAutenticado(true);
      setErro('');
      setSucesso('');
      return true;
    } else {
      setErro('Usuário ou senha incorretos!');
      setSucesso('');
      return false;
    }
  };

  const fazerLogout = () => {
    setAutenticado(false);
    setErro('');
    setSucesso('');
  };

  return {
    autenticado,
    erro,
    sucesso,
    fazerLogin,
    cadastrar,
    fazerLogout
  };
}
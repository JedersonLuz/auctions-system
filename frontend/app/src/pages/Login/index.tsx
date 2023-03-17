import React, { useState, ChangeEvent } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/lion-logo.png';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  async function handleLogIn(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const response = await api.post('api/token/', { username, password });

      localStorage.setItem('username', username);
      localStorage.setItem('access', response.data.access);
      localStorage.setItem('refresh', response.data.refresh);

      history.push('/home');
    } catch (err) {
      alert('Falha no login, tente novamente.');
    }
  }

  return (
    <div className="login-container">
      <section className="form">
        <form onSubmit={handleLogIn}>
          <h1>Faça seu login</h1>

          <input placeholder="Seu nome de usuário" value={username} onChange={e => setUsername(e.target.value)} />
          <input placeholder="Sua senha" type="password" value={password} onChange={e => setPassword(e.target.value)} />
          <button className="button" type="submit">
            Entrar
          </button>
        </form>
      </section>

      <img src={logoImg} alt="Lion" />
    </div>
  );
}
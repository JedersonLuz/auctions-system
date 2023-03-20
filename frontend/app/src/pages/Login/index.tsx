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
      let response = await api.post('api/token/', { username, password });

      const access = response.data.access;
      const refresh = response.data.refresh;

      localStorage.setItem('username', username);
      localStorage.setItem('access', access);
      localStorage.setItem('refresh', refresh);

      response = await api.get(`users/?username=${username}`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });

      const user = response.data.results[0].url.split('/').slice(-2, -1)[0];
      response = await api.get(`customers/?user=${user}`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });

      const customer_id = response.data.results[0].url;

      localStorage.setItem('customer_id', customer_id);

      history.push('/home');
    } catch (err) {
      console.log(err);
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
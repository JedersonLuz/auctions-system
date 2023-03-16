import React, { useState, ChangeEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

// import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/auction.png';

export default function Login() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  async function handleLogIn(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      // const response = await api.post('sessions', { id });

      // localStorage.setItem('ongId', id);
      // localStorage.setItem('ongName', response.data.name);

      history.push('/profile');
    } catch (err) {
      alert('Falha no login, tente novamente.');
    }
  }

  return (
    <div className="login-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero" />

        <form onSubmit={handleLogIn}>
          <h1>Faça seu login</h1>

          <input placeholder="Seu nome de usuário" value={id} onChange={e => setId(e.target.value)} />
          <input placeholder="Sua senha" type="password" value={password} onChange={e => setPassword(e.target.value)} />
          <button className="button" type="submit">
            Entrar
          </button>
        </form>
      </section>

      <img src={heroesImg} alt="Heroes" />
    </div>
  );
}
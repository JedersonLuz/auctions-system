import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft, FiArrowRight, FiPower, FiTrash2 } from 'react-icons/fi';

// import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Details() {
  const history = useHistory();

  function handleLogOut() {
    localStorage.clear();

    history.push('/');
  }

  return (
    <div className="details-container">
      <header>
        <img src={logoImg} alt="Be The Hero" />

        <button onClick={handleLogOut} type="button">
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <h1>Detalhes do Produto</h1>

      <div>
        <strong>Descição:</strong>
        <p>
          Jeep Compass 2021/2022
        </p>

        <strong className="details-incident-property">Produto:</strong>
        <p className="details-incident-value">Carro</p>

        <strong className="details-incidentProperty">Lance mínimo:</strong>
        <p className="details-incident-value">
          {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
            150000
          )}
        </p>
        
        <form onSubmit={() => {}}>
          <input type="number" placeholder="Informe o valor do seu lance" /* value={id} onChange={e => setId(e.target.value)} */ />
          <button className="button">
            Dar lance
          </button>
        </form>

      </div>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft, FiArrowRight, FiPower, FiTrash2 } from 'react-icons/fi';

// import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Profile() {
  const [products, setProducts] = useState([]);

  const history = useHistory();

  // const ongName = localStorage.getItem('ongName');
  // const ongId = localStorage.getItem('ongId');

  // useEffect(() => {
  //   api
  //     .get('profile', {
  //       headers: {
  //         Authorization: ongId,
  //       },
  //     })
  //     .then(response => {
  //       setIncidents(response.data);
  //     });
  // }, [ongId]);

  // async function handleDeleteIncident(id) {
  //   try {
  //     await api.delete(`incidents/${id}`, {
  //       headers: {
  //         Authorization: ongId,
  //       },
  //     });

  //     setIncidents(incidents.filter(incident => incident.id !== id));
  //   } catch (err) {
  //     alert('Erro ao deletar caso. Tente novamente.');
  //   }
  // }

  function handleLogOut() {
    localStorage.clear();

    history.push('/');
  }

  return (
    <div className="products-container">
      <header>
        <div>
          <img src={logoImg} alt="Be The Hero" />
          <span>Bem vindo, Usuário {/* {ongName} */}</span>
        </div>

        {/* <Link className="button" to="/products/new">
          Cadastrar novo produto
        </Link> */}

        <button onClick={handleLogOut} type="button">
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <h1>Produtos em Leilão</h1>

      <ul>
        {/* {{products.map(incident => (
          <li key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>

            <strong>VALOR:</strong>
            <p>
              {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                incident.value
              )}
            </p>

            <button onClick={() => handleDeleteIncident(incident.id)}>
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}} */}
        <li>
          <strong>Produto:</strong>
          <p>Terreno</p>

          <strong>Descrição:</strong>
          <p>Terreno de 2 hectares</p>

          <strong>Lance mínimo:</strong>
          <p>
            {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
              100000
            )}
          </p>

          <Link className="details-button" to="/home">
            Ver mais detalhes
            <FiArrowRight size={16} color="#6C63FF" />
          </Link>
        </li>
        <li>
          <strong>Produto:</strong>
          <p>Carro</p>

          <strong>Descrição:</strong>
          <p>Jeep Compass</p>

          <strong>Lance mínimo:</strong>
          <p>
            {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
              150000
            )}
          </p>

          <Link className="details-button" to="/home">
            Ver mais detalhes
            <FiArrowRight size={16} color="#6C63FF" />
          </Link>
        </li>
      </ul>
    </div>
  );
}
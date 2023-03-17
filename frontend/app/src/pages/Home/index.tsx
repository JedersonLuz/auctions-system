import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowRight, FiPower } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/lion-logo.png';

interface RealEstate {
  url: string,
  auction_id: string,
  type: string,
  address: string,
  number: string,
  complement: string,
  neighborhood: string,
  city: string,
  state: string,
  zip_code: string,
  latitude: number,
  longitude: number,
  area_total: number,
  building_area: number,
  status: string,
  condition: string,
  rooms: number,
  minimum_bid: number,
  minimum_bid_increment: number,
}

interface Vehicle {
  url: string,
  auction_id: string,
  brand: string,
  model: string,
  version: string,
  chassis: string,
  plate: string,
  mileage: number,
  year: number,
  color: string,
  fuel_type: string,
  transmission: string,
  doors: number,
  category: string,
  status: string,
  minimum_bid: number,
  minimum_bid_increment: number,
}

export default function Home() {
  const [realEstate, setRealEstate] = useState<RealEstate[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [products, setProducts] = useState<(RealEstate|Vehicle)[]>([]);

  const history = useHistory();

  const username = localStorage.getItem('username');
  const access = localStorage.getItem('access');
  // const refresh = localStorage.getItem('refresh');

  useEffect(() => {
    api.get('real-estates', {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })
    .then(response => {
      setRealEstate(response.data.results);
    });
    api.get('vehicles', {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })
    .then(response => {
      setVehicles(response.data.results);
    });
  }, [access]);

  useEffect(() => {
    setProducts([...realEstate, ...vehicles]);
  }, [realEstate, vehicles]);

  function instanceOfRealEstate(object: any): object is RealEstate {
    return 'address' in object;
  }

  function handleLogOut() {
    localStorage.clear();

    history.push('/');
  }

  return (
    <div className="products-container">
      <header>
        <div>
          <img src={logoImg} alt="Lion" />
          <span>Bem vindo, { username }</span>
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
        {products.map(product => {
          if (instanceOfRealEstate(product)) {
            return (
              <li key={product.url}>
                <strong>Produto:</strong>
                <p>{ product.type }</p>

                <strong>Endereço:</strong>
                <p>{ `${ product.address }, ${ product.number } - ${ product.city }/${ product.state }` }</p>

                <strong>Área total:</strong>
                <p>{ product.area_total } m²</p>

                <strong>Área construída:</strong>
                <p>{ product.building_area } m²</p>
                
                <strong>Lance mínimo:</strong>
                <p>
                  {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                    product.minimum_bid
                  )}
                </p>
                
                <Link className="details-button" to={`/details/real-estates/${product.url.split('/').slice(-2, -1)}`}>
                  Ver mais detalhes
                  <FiArrowRight size={16} color="#6C63FF" />
                </Link>
              </li>
            );
          } else {
            return (
              <li key={product.url}>
                <strong>Produto:</strong>
                <p>{ product.category }</p>

                <strong>Marca:</strong>
                <p>{ product.brand }</p>

                <strong>Modelo:</strong>
                <p>{ product.model }</p>

                <strong>Versão:</strong>
                <p>{ product.version }</p>

                <strong>Lance mínimo:</strong>
                <p>
                  {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                    product.minimum_bid
                  )}
                </p>

                <Link className="details-button" to={`/details/vehicles/${product.url.split('/').slice(-2, -1)}`}>
                  Ver mais detalhes
                  <FiArrowRight size={16} color="#6C63FF" />
                </Link>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
}
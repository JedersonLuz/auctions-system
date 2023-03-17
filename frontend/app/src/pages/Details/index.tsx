import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { FiArrowRight, FiPower } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

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

interface ProductsParams {
  id: string;
  type: string;
}

export default function Details() {
  const history = useHistory();

  const access = localStorage.getItem('access');
  // const refresh = localStorage.getItem('refresh');

  const params = useParams<ProductsParams>();
  const [product, setProduct] = useState<RealEstate | Vehicle>();

  useEffect(() => {
    api.get(`${params.type}/${params.id}`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })
      .then(response => {
        setProduct(response.data);
      });
  }, [params.type, params.id, access]);

  function handleLogOut() {
    localStorage.clear();

    history.push('/');
  }

  function instanceOfRealEstate(object: any): object is RealEstate {
    return 'address' in object;
  }

  function instanceOfVehicle(object: any): object is Vehicle {
    return 'brand' in object;
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

      {product && instanceOfRealEstate(product) && (
        <div>
          <strong>Produto:</strong>
          <p>{product.type}</p>

          <strong>Endereço:</strong>
          <p>{`${product.address}, ${product.number} - ${product.city}/${product.state}`}</p>

          <strong>Área total:</strong>
          <p>{product.area_total} m²</p>

          <strong>Área construída:</strong>
          <p>{product.building_area} m²</p>

          <strong>Lance mínimo:</strong>
          <p>
            {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
              product.minimum_bid
            )}
          </p>

          <Link className="details-button" to="/home">
            Ver mais detalhes
            <FiArrowRight size={16} color="#6C63FF" />
          </Link>

          <form onSubmit={() => { }}>
            <input type="number" placeholder="Informe o valor do seu lance" /* value={id} onChange={e => setId(e.target.value)} */ />
            <button className="button">
              Dar lance
            </button>
          </form>
        </div>
      )}
      {product && instanceOfVehicle(product) && (
        <div>
          <strong>Produto:</strong>
          <p>{product.category}</p>

          <strong>Marca:</strong>
          <p>{product.brand}</p>

          <strong>Modelo:</strong>
          <p>{product.model}</p>

          <strong>Versão:</strong>
          <p>{product.version}</p>

          <strong>Lance mínimo:</strong>
          <p>
            {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
              product.minimum_bid
            )}
          </p>

          <Link className="details-button" to="/home">
            Ver mais detalhes
            <FiArrowRight size={16} color="#6C63FF" />
          </Link>

          <form onSubmit={() => { }}>
            <input type="number" placeholder="Informe o valor do seu lance" /* value={id} onChange={e => setId(e.target.value)} */ />
            <button className="button">
              Dar lance
            </button>
          </form>
        </div>
      )}
      {/* <strong>Descição:</strong>
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
          <input type="number" placeholder="Informe o valor do seu lance" value={id} onChange={e => setId(e.target.value)} />
          <button className="button">
            Dar lance
          </button>
        </form> */}
    </div>
  );
}
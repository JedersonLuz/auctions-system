import React, { useState, useEffect, FormEvent } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';

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

interface ProductsParams {
  id: string;
  type: string;
}

interface BidHistory {
  auction_id: string,
  customer_id: string,
  real_estate_id: string,
  vehicle_id: string,
  value: number,
  status: string,
}

export default function Details() {
  const history = useHistory();

  const username = localStorage.getItem('username');
  const access = localStorage.getItem('access');
  // const refresh = localStorage.getItem('refresh');
  const customer_id = localStorage.getItem('customer_id');

  const params = useParams<ProductsParams>();
  const [product, setProduct] = useState<RealEstate | Vehicle>();
  const [lastBid, setLastBid] = useState<number>(0);
  const [bid, setBid] = useState<number>(0);

  useEffect(() => {
    api.get(`${params.type}/${params.id}`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })
      .then(response => {
        console.log(response.data);
        setProduct(response.data);
      });

    api.get(`/bid-histories/?product_type=${params.type}&product_id=${params.id}`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })
      .then(response => {
        console.log(response.data);
        if (response.data.results.length > 0) {
          setLastBid(response.data.results[0].value);
        }
      });
  }, [params.type, params.id, access]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!product || !customer_id) {
      alert('Erro ao carregar o produto.');
      return;
    }

    if (lastBid === 0 && bid < product.minimum_bid) {
      alert('O valor da sua oferta deve ser maior ou igual ao valor mínimo.');
      return;
    } else

    if (bid < (lastBid + product.minimum_bid_increment)) {
      alert('O valor da sua oferta deve ser maior que o valor da última oferta + o incremento mínimo.');
      return;
    }

    const data: BidHistory = {
      auction_id: product.auction_id,
      customer_id: customer_id,
      real_estate_id: '',
      vehicle_id: '',
      value: bid,
      status: '',
    };

    if (product && instanceOfRealEstate(product)) {
      data.real_estate_id = product.url;
    } else if (product && instanceOfVehicle(product)) {
      data.vehicle_id = product.url;
    }

    console.log(data);

    const response = await api.post('/bid-histories/', data, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

    if (response.status !== 201) {
      alert('Erro ao cadastrar o produto.');
      return;
    }

    console.log(response.data);
    setLastBid(bid);

    alert('Cadastro bem sucedido!');

    // history.push('/home');
  }

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
        <div>
          <img src={logoImg} alt="Lion" />
          <span>Bem vindo, { username }</span>
        </div>

        <button onClick={handleLogOut} type="button">
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <h1>Detalhes do Produto</h1>

      {product && instanceOfRealEstate(product) && (
        <div className="info-container">
          <strong>Produto:</strong>
          <p>{product.type}</p>

          <strong>Endereço:</strong>
          <p>{`${product.address}, ${product.number} - ${product.city}/${product.state}`}</p>

          <strong>Área total:</strong>
          <p>{product.area_total} m²</p>

          <strong>Área construída:</strong>
          <p>{product.building_area} m²</p>

          <strong>Último lance:</strong>
          <p>
            {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
              lastBid
            )}
          </p>

          <strong>Incremento mínimo:</strong>
          <p>
            {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
              product.minimum_bid_increment
            )}
          </p>

          <strong>Lance mínimo:</strong>
          <p>
            {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
              product.minimum_bid
            )}
          </p>

          <form onSubmit={handleSubmit}>
            <input type="number" placeholder="Informe o valor do seu lance" value={ bid } onChange={ e => setBid(Number(e.target.value)) } />
            <button className="button">
              Dar lance
            </button>
          </form>
        </div>
      )}
      {product && instanceOfVehicle(product) && (
        <div className='info-container'>
          <strong>Produto:</strong>
          <p>{product.category}</p>

          <strong>Marca:</strong>
          <p>{product.brand}</p>

          <strong>Modelo:</strong>
          <p>{product.model}</p>

          <strong>Versão:</strong>
          <p>{product.version}</p>

          <strong>Último lance:</strong>
          <p>
            {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
              lastBid
            )}
          </p>

          <strong>Incremento mínimo:</strong>
          <p>
            {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
              product.minimum_bid_increment
            )}
          </p>

          <strong>Lance mínimo:</strong>
          <p>
            {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
              product.minimum_bid
            )}
          </p>

          <form onSubmit={handleSubmit}>
          <input type="number" placeholder="Informe o valor do seu lance" value={ bid } onChange={ e => setBid(Number(e.target.value)) } />
            <button className="button">
              Dar lance
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
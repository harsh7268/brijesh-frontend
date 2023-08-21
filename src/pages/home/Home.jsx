/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Header from '../../components/header/Header';
import './home.css';
import Stock from '../../components/stocks/Stock';
import StockNew from '../../components/stocks/StockNew';

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export default function Home() {
  const [stockList, setStocks] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    console.log(process.env.REACT_APP_API_URL);
    const fetchEvents = async () => {
      const res = await axiosClient.get(`/stock${search}`);
      setStocks(res.data);
    };
    fetchEvents();
  }, [search]);
  return (
    <>
      <Header />
      <div className="home">
        <Stock stocklist={stockList} />
      </div>
    </>
  );
}

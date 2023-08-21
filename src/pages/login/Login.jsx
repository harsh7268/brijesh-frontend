import React, { useContext, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';
import './login.css';

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);
  console.log(isFetching);
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'LOGIN_START' });
    try {
      const resp = await axiosClient.post('/auth/login', {
        username: userRef.current.value,
        password: userRef.current.value,
      });
      dispatch({ type: 'LOGIN_SUCCESS', payload: resp.data });
    } catch (err) {
      dispatch({ type: 'LOGIN_FAILURE' });
    }
  };
  // console.log(user);
  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label htmlFor="username">
          UserName
          {' '}
        </label>
        <input type="text" id="username" className="loginInput" placeholder="Enter Your Username." ref={userRef} />
        <label htmlFor="password">
          Password
          {' '}
        </label>
        <input type="password" id="password" className="loginInput" placeholder="Enter Your Password." ref={passwordRef} />
        <button className="loginButton" type="submit" disabled={isFetching}>Login</button>
        <Link className="link loginRegisterButton" to="/register">Register</Link>

      </form>
    </div>
  );
}

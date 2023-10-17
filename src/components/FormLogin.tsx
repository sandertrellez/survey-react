import React, { useState, useContext } from 'react';
import './FormLogin.scss';
import axios from 'axios';
import { SurveyContext } from '../contexts/SurveyContext';
import Cookies from 'universal-cookie'
import { Navigate } from 'react-router-dom';

const FormLogin = () => {

    const {token, setToken} = useContext(SurveyContext) as any;

    const url = 'http://localhost:3333/login'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const cookie = new Cookies();

    const login = async () => {

        await axios.post(url,{ email, password })
        .then((response)=>{
            console.log(response)
            cookie.set('token', response.data.token.token)
            //Para cerrar sesion cookie.remove('token');
            
        })
        .catch((error) =>{
            console.log(error)
        }) 
    }

    //Si hay sesion iniciada se redirige
    if(cookie.get('token')){
        return (
            <Navigate
            to={"/"}
            />)
    }

  return (
    <div className="auth-container">
      <form className="auth-form">
      <h2 className="auth-form__title">Iniciar sesión</h2>
        <div className="auth-form__group">
          <label htmlFor="email" className="auth-form__label">
            Correo electrónico
          </label>
          <input  onChange={(e:any) =>{setEmail(e.target.value)}}
            type="email"
            id="email"
            className="auth-form__input"
            placeholder="Ingresa tu correo electrónico"
          />
        </div>
        <div className="auth-form__group">
          <label htmlFor="password" className="auth-form__label">
            Contraseña
          </label>
          <input onChange={(e:any) =>{setPassword(e.target.value)}}
            type="password"
            id="password"
            className="auth-form__input"
            placeholder="Ingresa tu contraseña"
          />
        </div>
        <input onClick={login}
        type='button' className="auth-form__submit-button" value="Iniciar sesión" />
      </form>
    </div>
  );
};

export default FormLogin;

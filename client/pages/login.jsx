import React from 'react';
import './login.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  async function login(event) {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: userName,
          password: password,
        }),
      });
      console.log('reseponse', response);
      const data = await response.json();
      setTimeout(() => {
        window.location.reload();
      }, 30000);

      if (data) {
        navigate('/');
      }
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div>
      <div className='login'>
        <div>
          <form>
            <div className='login-text'>
              <h2>LOGIN</h2>
              <h6>Please enter your login and password.</h6>
            </div>
            <div className='formGroup'>
              <input
                type='text'
                className='input-one'
                placeholder='Username'
                value={userName}
                onChange={(event) => {
                  setUserName(event.target.value);
                }}
              />
            </div>
            <div className='formGroup-2'>
              <input
                className='input-one'
                type='text'
                placeholder='Password'
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </div>
            <button type='submit' className='login-button' onClick={login}>
              Login
            </button>
            <button type='submit' className='login-button'>
              Don't have an account?
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

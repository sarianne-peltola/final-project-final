import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import user from '../reducers/user'

import { API_URL } from '../resuable/urls';

const Login = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState(null);

  const accessToken = useSelector(store => store.user.accessToken)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if (accessToken) {
      history.push('/')
    }
  }, [accessToken, history])

  const onFormSubmit = (e) => {
    e.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    }
    fetch(API_URL(mode), options)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setName(data.name))
            dispatch(user.actions.setEmail(data.email))
            dispatch(user.actions.setAccessToken(data.accessToken))
            dispatch(user.actions.setErrors(null))
          })
        } else {
          dispatch(user.actions.setErrors(data))
        }
      })
      .catch()
  };

  return (
    <form onSubmit={onFormSubmit}>
      <input
        type='text'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type='text'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type='submit' onClick={() => setMode('signin')}>
        Sign in
      </button>
      <button type='submit' onClick={() => setMode('signup')}>
        Register
      </button>
    </form>
  );
};

export default Login;

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { sign } from '../reducers/user';

const Login = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState(null);

  const accessToken = useSelector((store) => store.user.accessToken);
  const errors = useSelector((store => store.user.errors));
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (accessToken) {
      history.push('/');
    }
  }, [accessToken, history]);

  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(sign(name, email, password, mode));
  };

  return (
    <div>
      <h1>Welcome to SecretMessage!</h1>
      <h2>Please log in or register as a user in order to view your message</h2>
      <form onSubmit={onFormSubmit}>
      <input
        type='text'
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder='Name'
      />
      <input
        type='text'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Email'
      />
      <input
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder='Password'
      />
      <button type='submit' onClick={() => setMode('signin')}>
        Sign in
      </button>
      <button type='submit' onClick={() => setMode('signup')}>
        Register
      </button>
    </form>
    {errors && <div>{errors.message}</div>}
    </div>
  );
};

export default Login;

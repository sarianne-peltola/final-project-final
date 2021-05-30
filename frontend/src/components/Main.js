import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';

import { API_URL } from '../resuable/urls'

const Main = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const history = useHistory();

  useEffect(() => {
    if (!accessToken) {
      history.push('/login');
    }
  }, [accessToken, history]);

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: accessToken
      }
    }

    fetch(API_URL('mypage'), options)
      .then(res => res.json())
      .then(data => console.log(data))
  }, [accessToken])

  return (
    <div>
      <div>Main</div>
      <Link to='/login'>To login we go!</Link>
    </div>
  );
};

export default Main;

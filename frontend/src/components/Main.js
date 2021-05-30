import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { API_URL } from '../reusable/urls';

const Main = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const history = useHistory();

  useEffect(() => {
    if (!accessToken) {
      history.push('/login');
    }
  }, [accessToken, history]);

  useEffect(() => {
    if (accessToken) {
      const options = {
        method: 'GET',
        headers: {
          Authorization: accessToken,
        },
      };

      fetch(API_URL('mypage'), options)
        .then((res) => res.json())
        .then((data) => console.log(data));
    }
  }, [accessToken]);

  return (
    <div>
      <div>Here is a very secret message!</div>
    </div>
  );
};

export default Main;

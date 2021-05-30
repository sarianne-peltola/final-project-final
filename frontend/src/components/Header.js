import React from 'react';
import { batch, useSelector, useDispatch } from 'react-redux';

import user from '../reducers/user';

const Header = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const dispatch = useDispatch();

  const onButtonClick = () => {
    batch(() => {
      dispatch(user.actions.setAccessToken(null));
      dispatch(user.actions.setName(null));
      dispatch(user.actions.setEmail(null));

      localStorage.removeItem('user')
    });
  };

  return (
    <header>
      {accessToken && <button onClick={onButtonClick}>Logout</button>}
    </header>
  );
};

export default Header;

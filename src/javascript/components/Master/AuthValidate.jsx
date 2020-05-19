/* eslint-disable no-use-before-define */
// ---Dependencys
import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

// ------------------------------------------ COMPONENT-----------------------------------------
const AuthValidate = withRouter(props => {
  const currentPath = props.location.pathname;
  useEffect(onValidate, [currentPath]);

  function onValidate() {
    const { history } = props;
    localStorage.getItem('htFBgj3nK6QwY5hm');
    if (localStorage.getItem('htFBgj3nK6QwY5hm') !== 'U38Sw5Q8MtNwCYKW') {
      history.push('/master/login');
    } else if (currentPath === '/master') history.push('/master/productos');
  }

  return <React.Fragment>{props.children}</React.Fragment>;
});

export default AuthValidate;

import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
// Comons
import LoadingScreen from 'CommonComps/LoadingScreen';

const GoTo404 = withRouter(props => {
  useEffect(loadPage404, []);

  function loadPage404() {
    const { history } = props;
    setTimeout(() => {
      history.push('/error-404');
    }, 500);
  }
  return <LoadingScreen />;
});

export default GoTo404;

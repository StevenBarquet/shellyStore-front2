// ---Dependencys
import { withRouter } from 'react-router-dom';

// ------------------------------------------ COMPONENT-----------------------------------------
export const getUrlKey = withRouter(props => {
  const current = props.location.search;
  console.log('el param es: ', current);
  console.log('la url es: ', props.location);

  return current;
});

export default null;

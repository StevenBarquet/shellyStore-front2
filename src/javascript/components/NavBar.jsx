// ---Dependencys
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Row, Col } from 'antd';
// ---Others
import { title } from 'Others/labels.json';

const { main, sub } = title;

// ------------------------------------------ COMPONENT-----------------------------------------
const NavBar = withRouter(props => {
  const current = props.location.pathname;
  const isAdmin = new RegExp('^[/][m][a][s][t][e][r]');
  if (current === '/master/login') {
    return null;
  }
  if (isAdmin.test(current)) {
    return (
      <Row className="nav-div">
        <Col xs={24} sm={24} lg={6}>
          <Link to="/">
            <div className="to-home">
              {main} <span>{sub}</span>
            </div>
          </Link>
        </Col>
        <Col xs={24} sm={24} lg={18}>
          <Row>
            <Col xs={24} sm={24} lg={4}>
              <Link to="/master/productos">
                <div
                  className={
                    current === '/master/productos'
                      ? 'nav-btn nav-border'
                      : 'nav-btn'
                  }
                >
                  Productos
                </div>
              </Link>
            </Col>
            <Col xs={24} sm={24} lg={4}>
              <Link to="/master/ordenes">
                <div
                  className={
                    current === '/master/ordenes'
                      ? 'nav-btn nav-border'
                      : 'nav-btn'
                  }
                >
                  Ordenes
                </div>
              </Link>
            </Col>
            <Col xs={24} sm={24} lg={4}>
              <Link to="/master/cuenta">
                <div
                  className={
                    current === '/master/cuenta'
                      ? 'nav-btn nav-border'
                      : 'nav-btn'
                  }
                >
                  Mi cuenta
                </div>
              </Link>
            </Col>
            <Col xs={24} sm={24} lg={4}>
              <Link to="/master/salir">
                <div
                  className={
                    current === '/master/salir'
                      ? 'nav-btn nav-border'
                      : 'nav-btn'
                  }
                >
                  Salir
                </div>
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
  return (
    <Row className="nav-div">
      <Col xs={24} sm={24} lg={8}>
        <Link to="/">
          <div className="to-home">
            {main} <span>{sub}</span>
          </div>
        </Link>
      </Col>
      <Col xs={24} sm={24} lg={16}>
        <Row>
          <Col xs={24} sm={24} lg={5}>
            <Link to="/">
              <div
                className={current === '/' ? 'nav-btn nav-border' : 'nav-btn'}
              >
                Inicio
              </div>
            </Link>
          </Col>
          <Col xs={24} sm={24} lg={5}>
            <Link to="/productos">
              <div
                className={
                  current === '/productos' ? 'nav-btn nav-border' : 'nav-btn'
                }
              >
                Productos
              </div>
            </Link>
          </Col>
          <Col xs={24} sm={24} lg={5}>
            <Link to="/rastreo">
              <div
                className={
                  current === '/rastreo' ? 'nav-btn nav-border' : 'nav-btn'
                }
              >
                Rastreo
              </div>
            </Link>
          </Col>
        </Row>
      </Col>
    </Row>
  );
});

export default NavBar;

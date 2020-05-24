// ---Dependencys
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// ---Components
import NavBar from 'Comp/NavBar';
import Footer from 'Comp/Footer';
import Home from 'Cont/Home';
import Login from 'Cont/Login';
import Logout from 'Cont/Logout';
import Productos from 'Cont/Productos';
import Item from 'Cont/Item';
import Orden from 'Cont/Orden';
import CartMini from 'Cont/CartMini';
import AuthValidate from 'Comp/Master/AuthValidate';
import MaterOrders from 'Cont/MaterOrders';
import MasterProductos from 'Cont/MasterProductos';
import SuccessOrder from 'Cont/SuccessOrder';
import Rastreo from 'Cont/Rastreo';
import Ups404 from 'Cont/Ups404';
import GoTo404 from 'Cont/GoTo404';
// ------------------------------------------ COMPONENT-----------------------------------------
const AppContainer = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <CartMini />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/productos" component={Productos} />
        <Route exact path="/rastreo" component={Rastreo} />
        <Route path="/(item=[0-9a-zA-Z]+)" component={Item} />
        <Route path="/(orden[=0-9a-zA-Z]*)" component={Orden} />
        <Route exact path="/(success[=0-9a-zA-Z]+)" component={SuccessOrder} />
        <Route exact path="/master/login" component={Login} />
        <Route exact path="/master/salir" component={Logout} />
        <Route exact path="/master" component={AuthValidate} />
        <Route exact path="/master/productos" component={MasterProductos} />
        <Route exact path="/master/ordenes" component={MaterOrders} />
        <Route exact path="/error-404" component={Ups404} />
        <Route exact path="*" component={GoTo404} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default AppContainer;

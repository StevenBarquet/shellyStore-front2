// ---Dependencys
import React from 'react';
import { Link } from 'react-router-dom';
// ---Handle html headers
import CustomHelmet from 'Comp/CustomHelmet';
// ---Components
import RoundCarousel from 'Comp/Home/RoundCarousel';
import BuySteps from 'Comp/Home/BuySteps';
import ButtonProd from 'Comp/Home/ButtonProd';
// ---Others
import { title } from 'Others/labels.json';

const { main, sub } = title;

// ------------------------------------------ COMPONENT-----------------------------------------
const Home = () => {
  return (
    <React.Fragment>
      <CustomHelmet pageName="Home" />
      <div className="h-title">
        {main} <span>{sub}</span>
      </div>
      <p>
        Los mejores equipos de cómputo de <span>tiempo limitado</span> al mejor
        precio <Link to="/productos">aquí</Link>
      </p>
      <RoundCarousel />
      <div className="home-container">
        <p>
          En Shelly <span>amamos</span> los equipos de cómputo de calidad y sólo
          eso ofrecemos, literalmente no tenemos equipos <span>lentos</span> o
          que van a durar poco.
          <br />
          <br />
          No lo hacemos por dinero, lo hacemos por la satisfacción de que las
          personas tengan equipos de cómputo <span>asombrosos</span>, que les
          funcione para lo que necesitan a un <span>precio justo</span>
        </p>
        <br />
        <BuySteps />
        <ButtonProd />
      </div>
    </React.Fragment>
  );
};

export default Home;

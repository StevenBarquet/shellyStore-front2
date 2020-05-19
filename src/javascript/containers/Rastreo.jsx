/* eslint-disable no-else-return */
import React, { useEffect, useReducer } from 'react';
import { Row } from 'antd';
import { withRouter } from 'react-router-dom';
import {
  DollarCircleFilled,
  CodeSandboxOutlined,
  CarFilled,
  CheckCircleFilled
} from '@ant-design/icons';
// Comp
import Step from 'Comp/Rastreo/Step';
import Busqueda from 'Comp/Rastreo/Busqueda';

// Comons
import LoadingScreen from 'CommonComps/LoadingScreen';

// Other
import {
  getOneParam,
  getStringKey,
  copyFromOneIndexToOther
} from 'Others/otherMethods';
import { aclaracionPedido } from 'Others/labels.json';
import { getOrder } from 'Others/peticiones';

const steps = [
  {
    title: 'Pago en revisión: ',
    detail:
      'Si ya pagaste y aún no lo ves reflejado no te preocupes en menos de 24 hrs actualizaremos el estatus'
  },
  {
    title: 'Empacado: ',
    detail: 'El pedido se está preparando para la recolección o envío'
  },
  {
    title: 'En Camino: ',
    detail: 'El paquete está en camino a su domicilio via: '
  },
  {
    title: 'Entregado: ',
    detail: 'El producto fue entregado exitosamente :)'
  }
];

// 4 tipos de estado válidos:
// pago:mensaje, empaque:mensaje, envio:guia 909090asas, finish:something
// sugerencia de estado: En proceso/En revisión

const typesR = {
  SAVE_ROUTE: 'SAVE_ROUTE',
  SET_STEP: 'SET_STEP',
  NOT_FOUND: 'NOT_FOUND',
  SET_ORDER_STATUS: 'SET_ORDER_STATUS',
  SET_ORDER_LOCAL: 'SET_ORDER_LOCAL'
};

function reducerRastreo(state, action) {
  const { payload, type } = action;

  switch (type) {
    case typesR.SAVE_ROUTE:
      return {
        ...state,
        route: payload,
        notFound: false,
        loading: true,
        local: false
      };

    case typesR.SET_STEP: {
      const { subTitles, current } = payload;
      return { ...state, subTitles, current };
    }
    case typesR.NOT_FOUND:
      return { ...state, notFound: true, loading: false };

    case typesR.SET_ORDER_STATUS:
      return { ...state, estado: payload, local: false, loading: false };

    case typesR.SET_ORDER_LOCAL:
      return { ...state, local: true, loading: false };

    default:
      return state;
  }
}

const Rastreo = withRouter(props => {
  const { location } = props;
  const [state, dispatch] = useReducer(reducerRastreo, {
    route: '',
    loading: false,
    notFound: false,
    local: false,
    estado: 'empaque:En proceso/En revisión',
    subTitles: ['', '', '', ''],
    current: [false, false, false, false]
  });

  useEffect(() => {
    handleUrl();
  }, [location.search]);

  function handleUrl() {
    const { search } = location;
    dispatch({ type: typesR.SAVE_ROUTE, payload: search });
    const id = requestValidations(search);
    if (id) {
      handleGetOrder(id);
    } else {
      dispatch({ type: typesR.NOT_FOUND });
    }
  }

  function handleGetOrder(id) {
    getOrder(id).then(res => {
      // si existe un error
      if (res.response) {
        const { response } = res;
        // si no se encontró el id en la busqueda
        if (
          response.data &&
          response.data.error &&
          response.data.error === 'ID not found'
        ) {
          dispatch({ type: typesR.NOT_FOUND });
        } // else otro error desconocido
      } else {
        console.log('Respuesta exitosa: ', res);
        handleOrderStatus(res.data);
      }
    });
  }

  function handleOrderStatus(data) {
    const { pagoTipo, envioTipo, estatus } = data;
    if (envioTipo === 'paqueteria' && pagoTipo === 'online') {
      dispatch({ type: typesR.SET_ORDER_STATUS, payload: estatus });
    } else {
      dispatch({ type: typesR.SET_ORDER_LOCAL });
    }
  }

  function requestValidations(cadena) {
    if (cadena.length < 16) return false;

    const key = copyFromOneIndexToOther(cadena, 1, 2);
    const id = getOneParam(cadena);

    if (key !== 'id') return false;
    if (id < 12) return false;

    return id;
  }

  function currentStep() {
    // evalua el estado del pedido y asigna las props a los steps correspondientes
    const { estado } = state;
    const subTitle = getOneParam(estado);
    const estadoKey = getStringKey(estado);

    switch (estadoKey) {
      case 'pago':
        dispatch({
          type: typesR.SET_STEP,
          payload: {
            subTitles: [subTitle, '', '', ''],
            current: [true, false, false, false]
          }
        });
        break;
      case 'empaque':
        dispatch({
          type: typesR.SET_STEP,
          payload: {
            subTitles: ['Confirmado', subTitle, '', ''],
            current: [false, true, false, false]
          }
        });
        break;
      case 'envio':
        dispatch({
          type: typesR.SET_STEP,
          payload: {
            subTitles: ['Confirmado', 'Confirmado', subTitle, ''],
            current: [false, false, true, false]
          }
        });
        break;
      case 'finish':
        dispatch({
          type: typesR.SET_STEP,
          payload: {
            subTitles: ['Confirmado', 'Confirmado', 'Confirmado', 'Confirmado'],
            current: [false, false, false, true]
          }
        });
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    currentStep();
  }, [state.estado]);

  function renderSwitch() {
    const { route, loading, notFound, subTitles, current, local } = state;
    if (loading) {
      return <LoadingScreen />;
    } else if (route === '') {
      return (
        <h3>
          Revisa el estado de tu compra usando tu <span>id</span> de la orden
        </h3>
      );
    } else if (local) {
      return (
        <h3>
          Éste es un pedido de <span>recolección personal</span>, si tienes
          alguna duda contactanos
        </h3>
      );
    } else if (notFound) {
      return <h3>No se encontró pedido ...</h3>;
    }
    return (
      <React.Fragment>
        <Step
          subTitle={subTitles[0]}
          data={steps[0]}
          icon={<DollarCircleFilled />}
          current={current[0]}
        />
        <Step
          subTitle={subTitles[1]}
          data={steps[1]}
          icon={<CodeSandboxOutlined />}
          current={current[1]}
        />
        <Step
          subTitle={subTitles[2]}
          data={steps[2]}
          icon={<CarFilled />}
          enlace="https://www.estafeta.com/Herramientas/Rastreo"
          current={current[2]}
        />
        <Step
          subTitle={subTitles[3]}
          data={steps[3]}
          icon={<CheckCircleFilled />}
          current={current[3]}
        />
      </React.Fragment>
    );
  }

  return (
    <div className="rastreo-container">
      <Busqueda />
      <Row>{renderSwitch()}</Row>
      {state.route !== '' && (
        <Row>
          <h3>
            ¿Dudas?{' '}
            <a
              href={aclaracionPedido}
              rel="noopener noreferrer"
              target="_blank"
            >
              envíanos mensaje aquí
            </a>
          </h3>
        </Row>
      )}
    </div>
  );
});

export default Rastreo;

/* eslint-disable no-else-return */
// ---Dependencys
import React from 'react';
import { Progress } from 'antd';
import {
  BorderHorizontalOutlined,
  SettingFilled,
  RadiusBottomleftOutlined
} from '@ant-design/icons';
// ---ComonComponents
import ButtonMlg from 'CommonComps/ButtonMlg';
// ---Components
// import AuthValidate from 'Comp/Master/AuthValidate';

const Nada = () => (
  <div className="updater-loading">
    <h1>Elije una tarea</h1>
  </div>
);

const Cargando = () => {
  return (
    <div className="updater-loading">
      <h1>Cargando ...{<SettingFilled spin />}</h1>
    </div>
  );
};

const ChangeAnayst = props => {
  const { total } = props;
  return (
    <div className="updater-loading">
      <h1>
        Se encontraron <span>{total}</span> productos ...
        {<BorderHorizontalOutlined spin />}
      </h1>
    </div>
  );
};

const Analyzing = props => {
  const { total, anlyzedElement } = props;
  const percentage = Math.trunc((anlyzedElement * 100) / total);
  return (
    <div className="updater-loading">
      <h1>
        Analizando <span>{`${anlyzedElement} de ${total}`}</span> productos ...
        {<RadiusBottomleftOutlined spin />}
      </h1>
      <div className="updater-progress-container">
        <Progress type="circle" percent={percentage} />
      </div>
    </div>
  );
};

// ------------------------------------------ COMPONENT -----------------------------------------
const UpdaterLoader = props => {
  const { currentList, getingProducts, isLoading, anlyzedElement } = props;
  function loaderSelector() {
    console.log('currentList: ', currentList);
    if (isLoading) {
      return <Cargando />;
    } else if (!isLoading && currentList.length > 0 && getingProducts) {
      return (
        <Analyzing anlyzedElement={anlyzedElement} total={currentList.length} />
      );
    } else {
      return <Nada />;
    }
  }
  return <React.Fragment>{loaderSelector()}</React.Fragment>;
};

export default UpdaterLoader;

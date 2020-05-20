// ---Dependencys
import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
// ---Components
import AuthValidate from 'Comp/Master/AuthValidate';
import MasterListOrder from 'Comp/Master/MaterOrders/MasterListOrder';
import FormOrders from 'Comp/Master/MaterOrders/FormOrders';
// ---Others
import {
  insertLaptop,
  getAllOrders,
  getOrderMaster,
  deleteOrder,
  updateOrder
} from 'Others/peticiones';

const { confirm } = Modal;

// ------------------------------------------ COMPONENT-----------------------------------------
const MaterOrders = () => {
  const [state, setState] = useState({
    window: 'none',
    currentList: [],
    isEdit: false,
    form: {}
  });

  function handleForm(obj) {
    const { form } = state;
    setState({ ...state, form: { ...form, ...obj } });
  }

  function uploadNewLaptop() {
    return insertLaptop(state.form);
  }

  function editLaptop() {
    const newForm = prepareUpadateForm(state.form);
    return updateOrder(newForm);
  }

  function prepareUpadateForm(form) {
    const {
      domicilio,
      _id,
      items,
      total,
      envioTipo,
      pagoTipo,
      correo,
      nombre,
      apellido,
      estatus,
      telefono
    } = form;
    return {
      domicilio,
      _id,
      items,
      total,
      envioTipo,
      pagoTipo,
      correo,
      nombre,
      apellido,
      estatus,
      telefono
    };
  }

  function refreshLaptops() {
    getAllOrders().then(response => {
      setState({ ...state, currentList: response.data });
    });
  }

  function onCloseForm() {
    setState({
      ...state,
      window: 'none',
      isEdit: false
    });
  }

  function confirmDelete(idString) {
    confirm({
      title: <span className="modal-title">Confirmación</span>,
      icon: <ExclamationCircleOutlined />,
      content: <span className="modal-message">¿Quieres borrar la orden?</span>,
      onOk() {
        deleteOrder(idString);
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      }
    });
  }

  const onOpenEditProduct = id => {
    getOrderMaster(id).then(response => {
      setState({
        ...state,
        form: { ...response.data },
        isEdit: true,
        window: 'FormOrders'
      });
    });
  };

  useEffect(() => {
    refreshLaptops();
  }, []);

  function windowSwitch() {
    const { window, isEdit, form } = state;
    switch (window) {
      case 'FormOrders':
        return (
          <FormOrders
            uploadNewLaptop={uploadNewLaptop}
            formInitial={form}
            isEdit={isEdit}
            refreshLaptops={refreshLaptops}
            handleForm={handleForm}
            onCloseForm={onCloseForm}
            editLaptop={editLaptop}
          />
        );
      case 'none':
        return null;
      default:
        break;
    }
  }
  return (
    <AuthValidate>
      <div className="master-product-container">
        {windowSwitch()}
        <MasterListOrder
          currentList={state.currentList}
          onDeleteP={confirmDelete}
          refreshLaptops={refreshLaptops}
          onOpenEditProduct={onOpenEditProduct}
        />
      </div>
    </AuthValidate>
  );
};

export default MaterOrders;

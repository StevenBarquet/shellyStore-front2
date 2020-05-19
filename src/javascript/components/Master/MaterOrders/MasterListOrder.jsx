/* eslint-disable react/display-name */
/* eslint-disable react-hooks/exhaustive-deps */
// ---Dependencys
import React from 'react';
// ---Components
import { Button, Table } from 'antd';
// ---Others
// import { getALLLaptops } from 'Others/peticiones';

const MasterListOrder = props => {
  const { currentList, onDeleteP, refreshLaptops, onOpenEditProduct } = props;
  const dataSource = currentList;

  function handleDelete(e) {
    onDeleteP(e.target.value).then(() => {
      refreshLaptops();
    });
  }
  const editOpen = e => {
    onOpenEditProduct(e.target.value);
  };

  const columns = [
    {
      title: 'Fecha',
      dataIndex: 'date',
      key: 'date'
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total'
    },
    {
      title: 'Envio',
      dataIndex: 'envioTipo',
      key: 'envioTipo'
    },
    {
      title: 'Tipo Pago',
      dataIndex: 'pagoTipo',
      key: 'pagoTipo'
    },
    {
      title: 'Estado',
      dataIndex: 'estatus',
      key: 'estatus'
    },
    {
      title: 'Delete',
      dataIndex: '_id',
      key: '_id',
      render: _id => (
        <Button onClick={handleDelete} value={_id} type="danger">
          Borrar
        </Button>
      )
    },
    {
      title: 'Edit',
      dataIndex: '_id',
      key: '_id',
      render: _id => (
        <Button onClick={editOpen} value={_id} type="primary">
          Editar
        </Button>
      )
    }
  ];
  return (
    <React.Fragment>
      <Table dataSource={dataSource} columns={columns} />
    </React.Fragment>
  );
};

export default MasterListOrder;

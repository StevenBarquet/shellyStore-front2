/* eslint-disable react/display-name */
/* eslint-disable react-hooks/exhaustive-deps */
// ---Dependencys
import React from 'react';
// ---Components
import { Button, Table } from 'antd';
// ---Others
// import { getALLLaptops } from 'Others/peticiones';

const MasterListProduct = props => {
  const { currentList, onDeleteP, onOpenEditProduct } = props;
  const dataSource = currentList;

  function handleDelete(e) {
    onDeleteP(e.target.value);
  }
  const editOpen = e => {
    onOpenEditProduct(e.target.value);
  };

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'modelo',
      key: 'modelo'
    },
    {
      title: 'Precio',
      dataIndex: 'precio',
      key: 'precio'
    },
    {
      title: 'Disponibles',
      dataIndex: 'disponibles',
      key: 'disponibles'
    },
    {
      title: 'Categoria',
      dataIndex: 'categoria',
      key: 'categoria'
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
    },
    {
      title: 'Portada',
      dataIndex: 'images',
      key: 'images',
      render: images => (
        <span>
          <img src={images.cover} alt="vmo" width="40px" />
        </span>
      )
    }
  ];
  return (
    <React.Fragment>
      <Table
        pagination={{
          current: 1,
          pageSize: 100
        }}
        dataSource={dataSource}
        columns={columns}
      />
    </React.Fragment>
  );
};

export default MasterListProduct;

import axios from 'axios';

// export const urlServer = 'http://68.183.203.255:4000/';
export const urlServer = 'http://localhost:4000/';

export async function getAllLaptopsPublic(data) {
  const endpoint = 'laptops/todos';
  const url = urlServer + endpoint;
  try {
    const respose = await axios.post(url, data);
    return respose;
  } catch (error) {
    return error;
  }
}

export async function getLaptopPublic(id) {
  const endpoint = 'laptops/';
  const url = urlServer + endpoint + id;
  try {
    const respose = await axios.get(url);
    return respose;
  } catch (error) {
    return error;
  }
}

export async function getALLLaptops() {
  const endpoint = 'laptops/master/todos';
  const url = urlServer + endpoint;
  try {
    const respose = await axios.get(url);
    return respose;
  } catch (error) {
    return error;
  }
}

export async function getLaptop(id) {
  const endpoint = 'laptops/master/';
  const url = urlServer + endpoint + id;
  try {
    const respose = await axios.get(url);
    return respose;
  } catch (error) {
    return error;
  }
}

export async function updateLaptop(data) {
  const endpoint = 'laptops/editar';
  const url = urlServer + endpoint;
  try {
    const respose = await axios.put(url, data);
    return respose;
  } catch (error) {
    return error;
  }
}

export async function updateMLproduct(data) {
  const endpoint = 'laptops/editar/otro';
  const url = urlServer + endpoint;
  try {
    const respose = await axios.put(url, data);
    return respose;
  } catch (error) {
    return error;
  }
}

export async function insertLaptop(data) {
  const endpoint = 'laptops/registrar';
  const url = urlServer + endpoint;
  try {
    const respose = await axios.post(url, data);
    return respose;
  } catch (error) {
    return error;
  }
}

export async function insertMLproduct(data) {
  const endpoint = 'laptops/registrar/otro';
  const url = urlServer + endpoint;
  try {
    const respose = await axios.post(url, data);
    return respose;
  } catch (error) {
    return error;
  }
}

export async function deleteLaptop(id) {
  const endpoint = 'laptops/borrar/';
  const url = urlServer + endpoint + id;
  try {
    const respose = await axios.delete(url);
    return respose;
  } catch (error) {
    return error;
  }
}

export async function insertOrden(data) {
  const endpoint = 'ordenes/registrar';
  const url = urlServer + endpoint;
  try {
    const respose = await axios.post(url, data);
    return respose;
  } catch (error) {
    return error;
  }
}

export async function payOrden(id) {
  const endpoint = 'ordenes/pagado/';
  const url = urlServer + endpoint + id;
  try {
    const respose = await axios.put(url);
    return respose;
  } catch (error) {
    return error;
  }
}

export async function getOrder(id) {
  const endpoint = 'ordenes/';
  const url = urlServer + endpoint + id;
  try {
    const respose = await axios.get(url);
    return respose;
  } catch (error) {
    return error;
  }
}

export async function getOrderMaster(id) {
  const endpoint = 'ordenes/master/';
  const url = urlServer + endpoint + id;
  try {
    const respose = await axios.get(url);
    return respose;
  } catch (error) {
    return error;
  }
}

export async function getAllOrders() {
  const endpoint = 'ordenes/todos';
  const url = urlServer + endpoint;
  try {
    const respose = await axios.get(url);
    return respose;
  } catch (error) {
    return error;
  }
}

export async function checkItems(data) {
  const endpoint = 'ordenes/verifyProducts';
  const url = urlServer + endpoint;
  try {
    const respose = await axios.post(url, data);
    return respose;
  } catch (error) {
    return error;
  }
}

export async function updateOrder(data) {
  const endpoint = 'ordenes/editar';
  const url = urlServer + endpoint;
  try {
    const respose = await axios.put(url, data);
    return respose;
  } catch (error) {
    return error;
  }
}

export async function deleteOrder(id) {
  const endpoint = 'ordenes/borrar/';
  const url = urlServer + endpoint + id;
  try {
    const respose = await axios.delete(url);
    return respose;
  } catch (error) {
    return error;
  }
}

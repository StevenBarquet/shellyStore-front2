export const priceFormat = number => {
  // A partir de un int o float genera un string con formato de precio ($1,000.00)
  let num = number;
  num = num.toFixed(2);
  num = num.toString(10);
  const max = num.length;

  const comaIndex = max - 6;
  const half1 = str => {
    let cadena = '';
    for (let i = 0; i < comaIndex; i++) {
      cadena += str[i];
    }
    return cadena;
  };
  const half2 = str => {
    let cadena = '';
    for (let i = comaIndex; i < max; i++) {
      cadena += str[i];
    }
    return cadena;
  };

  let finalNum;

  if (num.length > 6) {
    finalNum = '$' + half1(num) + ',' + half2(num);
  } else {
    finalNum = '$' + num;
  }
  return finalNum;
};

export const copyToEnd = (str, index) => {
  // Copia una cadena a partir del index indicado
  let copy = '';
  for (let i = index; i < str.length; i++) {
    copy += str[i];
  }
  return copy;
};

export const copyToIndex = (str, index) => {
  // Copia una cadena hasta el index indicado
  let copy = '';
  for (let i = 0; i <= index; i++) {
    copy += str[i];
  }
  return copy;
};

export const copyFromOneIndexToOther = (str, index1, index2) => {
  // Copia una cadena hasta el index indicado
  let copy = '';
  for (let i = index1; i <= index2; i++) {
    copy += str[i];
  }
  return copy;
};

export const findIndexArrayObj = (array, obj) => {
  const value = Object.values(obj)[0];
  const isValueEqual = element => element === value; // Criterio de búsqueda para un mapeo
  let i;
  let found = false;
  for (i = 0; i < array.length; i++) {
    const values = Object.values(array[i]);
    if (values.findIndex(isValueEqual) !== -1) {
      found = true;
      break;
    }
  }
  return found ? i : -1;
};

export const getOneParam = cadena => {
  // obtiene el param de una url cuando sólo existe 1
  const indexStart = cadena.search(':');

  if (indexStart && indexStart !== -1) {
    const param = copyToEnd(cadena, indexStart + 1);
    return param;
  }
  return '';
};

export const getStringKey = cadena => {
  // obtiene el key de un string como "key: value"
  const indexFinish = cadena.search(':');

  if (indexFinish && indexFinish !== -1) {
    const key = copyToIndex(cadena, indexFinish - 1);
    return key;
  }
  return '';
};

export const isId = cadena => {
  // regex valida una palabra continua que sólo puede contener letras numeros y '-'
  return /^[0-9a-zA-ZñÑ]+$/.test(cadena);
};

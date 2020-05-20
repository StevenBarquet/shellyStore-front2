function superMLhandler(referenceML) {
  console.log('This is the superMLhandler', referenceML);
  const newForm = {
    origen: 'Mercado Libre',
    seller: {},
    marca: `Searched value: ${referenceML}`,
    images: {
      extra: ['', '', '']
    }
  };

  return newForm;
}

export default superMLhandler;

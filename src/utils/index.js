/* eslint-disable no-param-reassign */
const normalizeText = text => text.replace(/[^0-9]/g, '');

const getValidationErrors = err => {
  const validationErrors = {};

  err.inner.forEach(error => {
    validationErrors[error.path] = error.message;
  });

  return validationErrors;
};

const maskCep = value => {
  const firstValue = value.replace(/\D/g, ''); // 1239856
  const finalValue = firstValue.replace(/^(\d{5})(\d)/, '$1-$2');
  return finalValue;
};

const maskPhone = value => {
  const firstValue = value.replace(/\D/g, '');
  const secondValue = firstValue.replace(/^(\d{2})(\d)/g, '($1)$2');
  const finalValue = secondValue.replace(/(\d)(\d{4})$/, '$1-$2');
  return finalValue;
};

export { normalizeText, getValidationErrors, maskPhone, maskCep };

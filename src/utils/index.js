/* eslint-disable no-param-reassign */
const normalizeText = text => text.replace(/[^0-9]/g, '');

const getValidationErrors = err => {
  const validationErrors = {};

  err.inner.forEach(error => {
    validationErrors[error.path] = error.message;
  });

  return validationErrors;
};

export { normalizeText, getValidationErrors };

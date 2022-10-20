const validate = require('./validate');
const {body} = require('express-validator');

const getValidators = (method) => {
  switch (method) {
  case 'create':
    return [
      body('value')
        .notempty()
        .withMessage('A avaliação deve ser informada')
        .isInt({min: 1, max: 5})
        .withMessage('A avaliação deve ser um inteiro de 1 a 5 inclusive.'),
      body('comment')
        .optional()
        .isAlphanumeric({ignore: ' '})
        .withMessage('O comentário deve ser um texto válido.'),
      body('email')
        .notempty()
        .withMessage('O email deve ser informado')
        .isEmail()
        .withMessage('O email deve ser um email válido.'),
    ];
  case 'update':
    return [
      body('value')
        .optional()
        .isInt({min: 1, max: 5})
        .withMessage('A avaliação deve ser um inteiro de 1 a 5 inclusive.'),
      body('comment')
        .optional()
        .isAlphanumeric({ignore: ' '})
        .withMessage('O comentário deve ser um texto válido.'),
    ];
  }
};

function ratingValidate(method) {
  const validations = getValidators(method);
  return validate(validations);
}

module.exports = ratingValidate;

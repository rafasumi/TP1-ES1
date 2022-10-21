const validate = require('./validate');
const {body} = require('express-validator');

const getValidators = (method) => {
  switch (method) {
  case 'create':
    return [
      body('value')
        .notEmpty()
        .withMessage('A avaliação deve ser informada')
        .isInt({min: 1, max: 5})
        .withMessage('A avaliação deve ser um inteiro de 1 a 5 inclusive.'),
      body('comment')
        .optional()
        .isAlphanumeric('pt-BR', {ignore: ' '})
        .withMessage('O comentário deve ser um texto válido.'),
      body('email')
        .notEmpty()
        .withMessage('O email deve ser informado')
        .isEmail()
        .withMessage('O email deve ser um email válido.'),
      body('username')
        .notEmpty()
        .withMessage('O nome do usuário deve ser informado')
        .isString()
        .withMessage('O nome do usuário deve ser um texto válido.'),
    ];
  }
};

function ratingValidate(method) {
  const validations = getValidators(method);
  return validate(validations);
}

module.exports = ratingValidate;

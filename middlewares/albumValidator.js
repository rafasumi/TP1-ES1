const validate = require('./validate');
const {body} = require('express-validator');

const getValidators = (method) => {
  switch (method) {
  case 'create':
    return [
      body('name')
        .notEmpty()
        .withMessage('O nome do album deve ser informado.')
        .isString()
        .withMessage('O nome do album deve ser uma texto válido.'),
      body('year')
        .notEmpty()
        .withMessage('O ano do album deve ser informado.')
        .isInt()
        .withMessage('O ano do album deve ser um número inteiro.'),
      body('image')
        .notEmpty()
        .withMessage('A capa do album deve ser informada.')
        .isURL()
        .withMessage('A capa do album deve ser um URL válido.'),
      body('artist')
        .notEmpty()
        .withMessage('O artista do album deve ser informado.')
        .isInt()
        .withMessage('O artista do album deve ser um número inteiro.'),
    ];
  case 'update':
    return [
      body('name')
        .optional()
        .isString()
        .withMessage('O nome do album deve ser uma texto válido.'),
      body('year')
        .optional()
        .isInt()
        .withMessage('O ano do album deve ser um número inteiro.'),
      body('image')
        .optional()
        .isURL()
        .withMessage('A capa do album deve ser um URL válido.'),
      body('artist')
        .optional()
        .isInt()
        .withMessage('O artista do album deve ser um número inteiro.'),
    ];
  }
};

function albumValidate(method) {
  const validations = getValidators(method);
  return validate(validations);
}

module.exports = albumValidate;

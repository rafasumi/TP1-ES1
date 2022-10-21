const validate = require('./validate');
const {body} = require('express-validator');

const getValidators = (method) => {
  switch (method) {
  case 'create':
    return [
      body('name')
        .notEmpty()
        .withMessage('O nome do artista deve ser informado.')
        .isAlpha('pt-BR', {ignore: ' '})
        .withMessage('O nome do artista deve ser um texto válido.'),
      body('musicalGenre')
        .notEmpty()
        .withMessage('O gênero musical do artista deve ser informado.')
        .isString()
        .withMessage('O gênero musical do artista deve ser um texto válido.'),
      body('country')
        .notEmpty()
        .withMessage('O país do artista deve ser informado.')
        .isString({ignore: '0123456789 '})
        .withMessage('O país do artista deve ser um texto válido.'),
      body('image')
        .notEmpty()
        .withMessage('A imagem do artista deve ser informada.')
        .isURL()
        .withMessage('A imagem do artista deve ser um URL válido.'),
    ];
  case 'update':
    return [
      body('name')
        .optional()
        .isAlpha('pt-BR', {ignore: ' '})
        .withMessage('O nome do artista deve ser um texto válido.'),
      body('musicalGenre')
        .optional()
        .isString()
        .withMessage('O gênero musical do artista deve ser um texto válido.'),
      body('country')
        .optional()
        .isString({ignore: '0123456789 '})
        .withMessage('O país do artista deve ser um texto válido.'),
      body('image')
        .optional()
        .if(body('image').notEmpty()).isURL()
        .withMessage('A imagem do artista deve ser um URL válido.'),
    ];
  }
};

function artistValidate(method) {
  const validations = getValidators(method);
  return validate(validations);
}

module.exports = artistValidate;

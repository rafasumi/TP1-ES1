const {validationResult} = require('express-validator');

const validate = (validations) => {
  return async (req, res, next) => {
    for (const validation of validations) {
      await validation.run(req);
    }

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    
    res.render('400', {errors: errors.array()});
  };
};


module.exports = validate;

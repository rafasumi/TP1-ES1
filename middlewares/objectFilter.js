function objectFilter(object, keys) {
  return function(req, res, next) {
    try {
      Object.keys(req[object]).forEach((key) => {
        if (keys.indexOf(key) === -1 || !req[object][key]) {
          delete req[object][key];
        }
      });
      next();
    } catch (error) {
      next(error);
    }
  };
}

module.exports = objectFilter;

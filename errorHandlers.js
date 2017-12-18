function catchErrors(fn) {
  return function(req, res, next) {
    return fn(req, res, next).catch(next);
  };
}

function developmentErrors(err, req, res, next) {
  err.stack = err.stack || "";
  const errorDetails = {
    message: err.message,
    status: err.status,
    stackHighlighted: err.stack.replace(
      /[a-z_-\d]+.js:\d+:\d+/gi,
      "<mark>$&</mark>"
    )
  };
  res.status(err.status || 500);
  res.json(errorDetails);
}

function productionErrors(err, req, res, next) {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: {}
  });
}

module.exports = {
  catchErrors,
  developmentErrors,
  productionErrors
};

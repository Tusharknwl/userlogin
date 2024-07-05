// a wrapper for async request handlers to catch errors and pass them to the error handling middleware
const asyncHandler = (reqHandler) => {
  return async (req, res, next) => {
    Promise.resolve(reqHandler(req, res, next)).catch((err) => next(err));
  };
};

export { asyncHandler };

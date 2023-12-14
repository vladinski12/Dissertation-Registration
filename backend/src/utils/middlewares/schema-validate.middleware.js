import HttpException from '../http-exception.js';

const ValidateSchema = (schema) => (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(new HttpException(error.message, 400));
    }
    return next();
  } catch (e) {
    return next(new HttpException(e.message, 400));
  }
};

export default ValidateSchema;

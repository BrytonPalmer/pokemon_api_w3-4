// Generic validation middleware. Pass it a Joi schema and it validates req.body.
// Usage: router.post('/register', validate(registerSchema), authController.register);

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const messages = error.details.map((detail) => detail.message);
      return res.status(400).json({ errors: messages });
    }

    next();
  };
};

module.exports = validate;

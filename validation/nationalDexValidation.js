const Joi = require('joi');

const nationalDexSchema = Joi.object({
  name: Joi.string().min(1).max(100).required(),
  dexNumber: Joi.number().integer().min(1).required(),
  type1: Joi.string().min(1).max(50).required(),
  type2: Joi.string().min(1).max(50).allow(''),
  region: Joi.string().min(1).max(50).required(),
  sprite: Joi.string().uri().allow(''),
  description: Joi.string().max(1000).allow('')
});

module.exports = {
  nationalDexSchema
};
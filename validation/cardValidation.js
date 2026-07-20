const Joi = require('joi');

// Matches the fields used in your sinnohController.js create/update logic.
// Duplicate/adjust this for nationalDex fields if they differ.
const cardSchema = Joi.object({
  name: Joi.string().min(1).max(100).required(),
  dexNumber: Joi.number().integer().min(1).required(),
  type: Joi.string().min(1).max(50).required(),
  rarity: Joi.string().min(1).max(50).required(),
  setName: Joi.string().min(1).max(100).required(),
  hp: Joi.number().integer().min(0).required(),
  attackName: Joi.string().max(100).allow(''),
  attackDamage: Joi.number().integer().min(0).allow(null),
  description: Joi.string().max(1000).allow(''),
  imageUrl: Joi.string().uri().allow('')
});

module.exports = {
  cardSchema
};

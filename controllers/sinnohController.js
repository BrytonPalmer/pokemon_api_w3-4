const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// GET all Sinnoh cards
const getAll = async (req, res) => {
  try {
    const cards = await mongodb.getDatabase()
      .db('PokemonPlatnium')
      .collection('SinnohCards')
      .find({})
      .toArray();

    res.status(200).json(cards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET single Sinnoh card
const getSingle = async (req, res) => {
  try {
    const cardId = new ObjectId(req.params.id);

    const card = await mongodb.getDatabase()
      .db('PokemonPlatnium')
      .collection('SinnohCards')
      .findOne({ _id: cardId });

    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }

    res.status(200).json(card);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE Sinnoh card
const createCard = async (req, res) => {
  try {
    const card = {
      name: req.body.name,
      dexNumber: req.body.dexNumber,
      type: req.body.type,
      rarity: req.body.rarity,
      setName: req.body.setName,
      hp: req.body.hp,
      attackName: req.body.attackName,
      attackDamage: req.body.attackDamage,
      description: req.body.description,
      imageUrl: req.body.imageUrl
    };

    const response = await mongodb.getDatabase()
      .db('PokemonPlatnium')
      .collection('SinnohCards')
      .insertOne(card);

    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE Sinnoh card
const updateCard = async (req, res) => {
  try {
    const cardId = new ObjectId(req.params.id);

    const card = {
      name: req.body.name,
      dexNumber: req.body.dexNumber,
      type: req.body.type,
      rarity: req.body.rarity,
      setName: req.body.setName,
      hp: req.body.hp,
      attackName: req.body.attackName,
      attackDamage: req.body.attackDamage,
      description: req.body.description,
      imageUrl: req.body.imageUrl
    };

    const response = await mongodb.getDatabase()
      .db('PokemonPlatnium')
      .collection('SinnohCards')
      .replaceOne({ _id: cardId }, card);

    if (response.modifiedCount > 0) {
      return res.status(200).json(response);
    }

    res.status(404).json({ message: 'Card not found or no changes made' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE Sinnoh card
const deleteCard = async (req, res) => {
  try {
    const cardId = new ObjectId(req.params.id);

    const response = await mongodb.getDatabase()
      .db('PokemonPlatnium')
      .collection('SinnohCards')
      .deleteOne({ _id: cardId });

    if (response.deletedCount > 0) {
      return res.status(200).json({ message: 'Card deleted' });
    }

    res.status(404).json({ message: 'Card not found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createCard,
  updateCard,
  deleteCard
};
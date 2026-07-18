const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// GET all Sinnoh cards
const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDatabase().db().collection('SinnohCards').find();
    const cards = await result.toArray();
    res.status(200).json(cards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET single Sinnoh card
const getSingle = async (req, res) => {
  try {
    const cardId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('SinnohCards').find({ _id: cardId });
    const cards = await result.toArray();

    if (!cards[0]) {
      return res.status(404).json({ message: 'Card not found' });
    }

    res.status(200).json(cards[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE Sinnoh card
const createCard = async (req, res) => {
  try {
    const card = req.body;

    const response = await mongodb.getDatabase().db().collection('SinnohCards').insertOne(card);

    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE Sinnoh card
const updateCard = async (req, res) => {
  try {
    const cardId = new ObjectId(req.params.id);
    const card = req.body;

    const response = await mongodb.getDatabase().db().collection('SinnohCards').updateOne(
      { _id: cardId },
      { $set: card }
    );

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
    const response = await mongodb.getDatabase().db().collection('SinnohCards').deleteOne({ _id: cardId });

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
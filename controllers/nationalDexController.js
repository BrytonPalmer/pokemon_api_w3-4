const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// GET all National Dex cards
const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDatabase().db().collection('NationalDexCards').find();
    const dex = await result.toArray();
    res.status(200).json(dex);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET single National Dex card
const getSingle = async (req, res) => {
  try {
    const dexId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('NationalDexCards').find({ _id: dexId });
    const dex = await result.toArray();

    if (!dex[0]) {
      return res.status(404).json({ message: 'Dex entry not found' });
    }

    res.status(200).json(dex[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE National Dex card
const createDex = async (req, res) => {
  try {
    const dex = req.body;

    const response = await mongodb.getDatabase().db().collection('NationalDexCards').insertOne(dex);

    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE National Dex card
const updateDex = async (req, res) => {
  try {
    const dexId = new ObjectId(req.params.id);
    const dex = req.body;

    const response = await mongodb.getDatabase().db().collection('NationalDexCards').updateOne(
      { _id: dexId },
      { $set: dex }
    );

    if (response.modifiedCount > 0) {
      return res.status(200).json(response);
    }

    res.status(404).json({ message: 'Dex entry not found or no changes made' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE National Dex card
const deleteDex = async (req, res) => {
  try {
    const dexId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('NationalDexCards').deleteOne({ _id: dexId });

    if (response.deletedCount > 0) {
      return res.status(200).json({ message: 'Dex entry deleted' });
    }

    res.status(404).json({ message: 'Dex entry not found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createDex,
  updateDex,
  deleteDex
};
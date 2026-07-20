const mongodb = require('../data/database'); // adjust path to match your project structure
const { hashPassword, comparePassword, generateToken } = require('../utils/authUtils');

// POST /auth/register
const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const usersCollection = mongodb.getDatabase().db('PokemonPlatnium').collection('users');

    // Check if a user already exists with this email
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'A user with this email already exists' });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = {
      username,
      email,
      password: hashedPassword,
      role: role === 'admin' ? 'admin' : 'user', // default to 'user' unless explicitly admin
      createdAt: new Date()
    };

    const result = await usersCollection.insertOne(newUser);

    const token = generateToken({ _id: result.insertedId, email: newUser.email, role: newUser.role });

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: result.insertedId,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /auth/login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const usersCollection = mongodb.getDatabase().db('PokemonPlatnium').collection('users');

    const user = await usersCollection.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const passwordMatches = await comparePassword(password, user.password);
    if (!passwordMatches) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user);

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  register,
  login
};

// EXAMPLE ONLY — shows how to add authRoutes into your existing routes/index.js
// Merge this pattern into your real file, don't just drop this in wholesale.

const router = require('express').Router();

router.get('/', (req, res) => {
    //#swagger.tags=['Hello World']
    res.send('Hello Pokemon World');
});

// Auth routes (register/login) - public, no token required
router.use('/auth', require('./authRoutes'));

// Cards routes
router.use('/sinnoh', require('./sinnohRoutes'));

// Decks routes
router.use('/national', require('./nationalDexRoutes'));

// Swagger route
router.use('/', require('../swagger'));

module.exports = router;

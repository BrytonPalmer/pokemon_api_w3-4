const router = require('express').Router();

router.get('/', (req, res) => {
    //#swagger.tags=['Hello World']
    res.send('Hello Pokemon World');
});

// Cards routes
router.use('/cards', require('./sinnohRoutes'));

// Decks routes
router.use('/decks', require('./nationalDexRoutes'));

// Swagger route
router.use('/', require('../swagger'));

module.exports = router;
const router = require('express').Router();
const controller = require('../controllers/sinnohController');

router.get('/', 
    //#swagger.tags=['Sinnoh Cards']
    //#swagger.description='Get all Sinnoh cards'
    controller.getAll
);

router.get('/:id',
    //#swagger.tags=['Sinnoh Cards']
    //#swagger.description='Get a single Sinnoh card'
    controller.getSingle
);

router.post('/',
    //#swagger.tags=['Sinnoh Cards']
    //#swagger.description='Create a new Sinnoh card'
    controller.createCard
);

router.put('/:id',
    //#swagger.tags=['Sinnoh Cards']
    //#swagger.description='Update a Sinnoh card'
    controller.updateCard
);

router.delete('/:id',
    //#swagger.tags=['Sinnoh Cards']
    //#swagger.description='Delete a Sinnoh card'
    controller.deleteCard
);

module.exports = router;



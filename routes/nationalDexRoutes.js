const router = require('express').Router();
const controller = require('../controllers/nationalDexController');

router.get('/',
    //#swagger.tags=['National Dex']
    //#swagger.description='Get all National Dex entries'
    controller.getAll
);

router.get('/:id',
    //#swagger.tags=['National Dex']
    //#swagger.description='Get a single National Dex entry'
    controller.getSingle
);

router.post('/',
    //#swagger.tags=['National Dex']
    //#swagger.description='Create a new National Dex entry'
    controller.createDex
);

router.put('/:id',
    //#swagger.tags=['National Dex']
    //#swagger.description='Update a National Dex entry'
    controller.updateDex
);

router.delete('/:id',
    //#swagger.tags=['National Dex']
    //#swagger.description='Delete a National Dex entry'
    controller.deleteDex
);


module.exports = router;

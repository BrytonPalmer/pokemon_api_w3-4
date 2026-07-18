const router = require('express').Router();
const controller = require('../controllers/nationalDexController');

/*
    #swagger.tags = ['National Dex Cards']
    #swagger.summary = 'Get all National Dex cards'
    #swagger.description = 'Returns all National Dex Pokémon cards from the database.'
    #swagger.responses[200] = {
        description: 'List of National Dex cards',
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    _id: { type: 'string' },
                    name: { type: 'string' },
                    dexNumber: { type: 'integer' },
                    type1: { type: 'string' },
                    type2: { type: 'string' },
                    region: { type: 'string' },
                    sprite: { type: 'string' },
                    description: { type: 'string' }
                }
            }
        }
    }
*/
router.get('/', controller.getAll);

/*
    #swagger.tags = ['National Dex Cards']
    #swagger.summary = 'Get a National Dex card by ID'
    #swagger.description = 'Returns a single National Dex Pokémon card.'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'MongoDB ObjectId of the card',
        required: true,
        type: 'string'
    }
    #swagger.responses[200] = {
        description: 'National Dex card retrieved',
        schema: {
            type: 'object',
            properties: {
                _id: { type: 'string' },
                name: { type: 'string' },
                dexNumber: { type: 'integer' },
                type1: { type: 'string' },
                type2: { type: 'string' },
                region: { type: 'string' },
                sprite: { type: 'string' },
                description: { type: 'string' }
            }
        }
    }
*/
router.get('/:id', controller.getSingle);

/*
    #swagger.tags = ['National Dex Cards']
    #swagger.summary = 'Create a new National Dex card'
    #swagger.description = 'Adds a new National Dex Pokémon card to the database.'
    #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
            name: 'Palkia',
            dexNumber: 484,
            type1: 'Water',
            type2: 'Dragon',
            region: 'Sinnoh',
            sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/484.png',
            description: 'It has the ability to distort space. It is said to live in a gap in the spatial dimension.'
        }
    }
*/
router.post('/', controller.createDex);

/*
    #swagger.tags = ['National Dex Cards']
    #swagger.summary = 'Update a National Dex card'
    #swagger.description = 'Updates an existing National Dex Pokémon card.'
*/
router.put('/:id', controller.updateDex);

/*
    #swagger.tags = ['National Dex Cards']
    #swagger.summary = 'Delete a National Dex card'
    #swagger.description = 'Deletes a National Dex Pokémon card from the database.'
*/
router.delete('/:id', controller.deleteDex);

module.exports = router;
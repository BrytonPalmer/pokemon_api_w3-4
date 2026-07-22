const router = require('express').Router();
const controller = require('../controllers/nationalDexController');
const validate = require('../middleware/validate');
const { nationalDexSchema } = require('../validation/nationalDexValidation');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const validateObjectId = require('../middleware/validateObjectId');
 
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
    #swagger.responses[500] = { description: 'Internal Server Error' }
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
    #swagger.responses[400] = { description: 'Invalid ID format' }
    #swagger.responses[404] = { description: 'Dex entry not found' }
    #swagger.responses[500] = { description: 'Internal Server Error' }
*/
router.get('/:id', validateObjectId, controller.getSingle);
 
/*
    #swagger.tags = ['National Dex Cards']
    #swagger.summary = 'Create a new National Dex card'
    #swagger.description = 'Adds a new National Dex Pokémon card to the database. Requires admin role.'
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
    #swagger.responses[201] = { description: 'Dex entry created' }
    #swagger.responses[400] = { description: 'Validation error' }
    #swagger.responses[401] = { description: 'Not authenticated' }
    #swagger.responses[403] = { description: 'Not authorized (admin only)' }
    #swagger.responses[500] = { description: 'Internal Server Error' }
*/
router.post('/', authenticate, authorize('admin'), validate(nationalDexSchema), controller.createDex);
 
/*
    #swagger.tags = ['National Dex Cards']
    #swagger.summary = 'Update a National Dex card'
    #swagger.description = 'Updates an existing National Dex Pokémon card. Requires admin role.'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'MongoDB ObjectId of the card',
        required: true,
        type: 'string'
    }
    #swagger.responses[200] = { description: 'Dex entry updated' }
    #swagger.responses[400] = { description: 'Invalid ID format or validation error' }
    #swagger.responses[401] = { description: 'Not authenticated' }
    #swagger.responses[403] = { description: 'Not authorized (admin only)' }
    #swagger.responses[404] = { description: 'Dex entry not found' }
    #swagger.responses[500] = { description: 'Internal Server Error' }
*/
router.put('/:id', authenticate, authorize('admin'), validateObjectId, validate(nationalDexSchema), controller.updateDex);
 
/*
    #swagger.tags = ['National Dex Cards']
    #swagger.summary = 'Delete a National Dex card'
    #swagger.description = 'Deletes a National Dex Pokémon card from the database. Requires admin role.'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'MongoDB ObjectId of the card',
        required: true,
        type: 'string'
    }
    #swagger.responses[200] = { description: 'Dex entry deleted' }
    #swagger.responses[400] = { description: 'Invalid ID format' }
    #swagger.responses[401] = { description: 'Not authenticated' }
    #swagger.responses[403] = { description: 'Not authorized (admin only)' }
    #swagger.responses[404] = { description: 'Dex entry not found' }
    #swagger.responses[500] = { description: 'Internal Server Error' }
*/
router.delete('/:id', authenticate, authorize('admin'), validateObjectId, controller.deleteDex);
 
module.exports = router;
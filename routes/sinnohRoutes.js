const router = require('express').Router();
const controller = require('../controllers/sinnohController');
const validate = require('../middleware/validate');
const { cardSchema } = require('../validation/cardValidation');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const validateObjectId = require('../middleware/validateObjectId');
 
/* 
    #swagger.tags = ['Sinnoh Cards']
    #swagger.summary = 'Get all Sinnoh cards'
    #swagger.description = 'Returns all Sinnoh region Pokémon cards from the database.'
    #swagger.responses[200] = {
        description: 'List of Sinnoh cards',
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    _id: { type: 'string' },
                    name: { type: 'string' },
                    dexNumber: { type: 'integer' },
                    type: { type: 'string' },
                    rarity: { type: 'string' },
                    setName: { type: 'string' },
                    hp: { type: 'integer' },
                    attackName: { type: 'string' },
                    attackDamage: { type: 'integer' },
                    description: { type: 'string' },
                    imageUrl: { type: 'string' }
                }
            }
        }
    }
    #swagger.responses[500] = { description: 'Internal Server Error' }
*/
router.get('/', controller.getAll);
 
/*
    #swagger.tags = ['Sinnoh Cards']
    #swagger.summary = 'Get a Sinnoh card by ID'
    #swagger.description = 'Returns a single Sinnoh Pokémon card.'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'MongoDB ObjectId of the card',
        required: true,
        type: 'string'
    }
    #swagger.responses[200] = {
        description: 'Sinnoh card retrieved',
        schema: {
            type: 'object',
            properties: {
                _id: { type: 'string' },
                name: { type: 'string' },
                dexNumber: { type: 'integer' },
                type: { type: 'string' },
                rarity: { type: 'string' },
                setName: { type: 'string' },
                hp: { type: 'integer' },
                attackName: { type: 'string' },
                attackDamage: { type: 'integer' },
                description: { type: 'string' },
                imageUrl: { type: 'string' }
            }
        }
    }
    #swagger.responses[400] = { description: 'Invalid ID format' }
    #swagger.responses[404] = { description: 'Card not found' }
    #swagger.responses[500] = { description: 'Internal Server Error' }
*/
router.get('/:id', validateObjectId, controller.getSingle);
 
/*
    #swagger.tags = ['Sinnoh Cards']
    #swagger.summary = 'Create a new Sinnoh card'
    #swagger.description = 'Adds a new Sinnoh Pokémon card to the database. Requires admin role.'
    #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
            name: 'Turtwig',
            dexNumber: 387,
            type: 'Grass',
            rarity: 'Common',
            setName: 'Sinnoh Origins',
            hp: 60,
            attackName: 'Leaf Blade',
            attackDamage: 30,
            description: 'A small Grass-type Pokémon that loves sunlight.',
            imageUrl: 'https://example.com/turtwig-card.png'
        }
    }
    #swagger.responses[201] = { description: 'Card created' }
    #swagger.responses[400] = { description: 'Validation error' }
    #swagger.responses[401] = { description: 'Not authenticated' }
    #swagger.responses[403] = { description: 'Not authorized (admin only)' }
    #swagger.responses[500] = { description: 'Internal Server Error' }
*/
router.post('/', authenticate, authorize('admin'), validate(cardSchema), controller.createCard);
 
/*
    #swagger.tags = ['Sinnoh Cards']
    #swagger.summary = 'Update a Sinnoh card'
    #swagger.description = 'Updates an existing Sinnoh Pokémon card. Requires admin role.'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'MongoDB ObjectId of the card',
        required: true,
        type: 'string'
    }
    #swagger.responses[200] = { description: 'Card updated' }
    #swagger.responses[400] = { description: 'Invalid ID format or validation error' }
    #swagger.responses[401] = { description: 'Not authenticated' }
    #swagger.responses[403] = { description: 'Not authorized (admin only)' }
    #swagger.responses[404] = { description: 'Card not found' }
    #swagger.responses[500] = { description: 'Internal Server Error' }
*/
router.put('/:id', authenticate, authorize('admin'), validateObjectId, validate(cardSchema), controller.updateCard);
 
/*
    #swagger.tags = ['Sinnoh Cards']
    #swagger.summary = 'Delete a Sinnoh card'
    #swagger.description = 'Deletes a Sinnoh Pokémon card from the database. Requires admin role.'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'MongoDB ObjectId of the card',
        required: true,
        type: 'string'
    }
    #swagger.responses[200] = { description: 'Card deleted' }
    #swagger.responses[400] = { description: 'Invalid ID format' }
    #swagger.responses[401] = { description: 'Not authenticated' }
    #swagger.responses[403] = { description: 'Not authorized (admin only)' }
    #swagger.responses[404] = { description: 'Card not found' }
    #swagger.responses[500] = { description: 'Internal Server Error' }
*/
router.delete('/:id', authenticate, authorize('admin'), validateObjectId, controller.deleteCard);
 
module.exports = router;
// EXAMPLE ONLY — shows the pattern for protecting your existing sinnohRoutes.js
// GET requests stay public/open. POST/PUT/DELETE require a valid token AND admin role.
// Apply the same pattern to nationalDexRoutes.js.

const router = require('express').Router();
const sinnohController = require('../controllers/sinnohController');

const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const validate = require('../middleware/validate');
const { cardSchema } = require('../validation/cardValidation');

// Public reads — no auth required
router.get('/', sinnohController.getAll);
router.get('/:id', sinnohController.getSingle);

// Protected writes — must be logged in AND have the 'admin' role
router.post(
  '/',
  authenticate,
  authorize('admin'),
  validate(cardSchema),
  sinnohController.createCard
);

router.put(
  '/:id',
  authenticate,
  authorize('admin'),
  validate(cardSchema),
  sinnohController.updateCard
);

router.delete(
  '/:id',
  authenticate,
  authorize('admin'),
  sinnohController.deleteCard
);

module.exports = router;

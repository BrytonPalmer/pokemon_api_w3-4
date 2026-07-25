const router = require('express').Router();
const authController = require('../controllers/authController');
const validate = require('../middleware/validate');
const { registerSchema, loginSchema } = require('../validation/authValidation');

router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);

const passport = require('../passport-config'); // adjust path if authRoutes.js is nested differently
 
// Step 1: kicks off GitHub login
router.get('/github', passport.authenticate('github'));
 
// Step 2: GitHub redirects back here after user approves
router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    res.json({ message: 'Logged in successfully', user: req.user });
  }
);
 
// Logout
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Logged out successfully' });
  });
});
 

module.exports = router;

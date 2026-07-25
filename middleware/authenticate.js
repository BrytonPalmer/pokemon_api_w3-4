// Session-based authentication check (replaces JWT check).
// Passport populates req.isAuthenticated() and req.user automatically
// once a user has logged in via GitHub.
const authenticate = (req, res, next) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ message: 'You do not have access' });
};
 
module.exports = authenticate;
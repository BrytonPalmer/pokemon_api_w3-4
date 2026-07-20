// Role-based authorization middleware.
// Usage: authorize('admin')  OR  authorize('admin', 'editor')
// Must run AFTER the `authenticate` middleware, since it relies on req.user.

const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Access denied. Requires role: ${allowedRoles.join(' or ')}`
      });
    }

    next();
  };
};

module.exports = authorize;

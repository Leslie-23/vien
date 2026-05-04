const adminAuth = (req, res, next) => {
  const token = process.env.ADMIN_TOKEN;
  if (!token) {
    return res.status(503).json({ error: 'Admin access not configured' });
  }
  const provided = req.get('x-admin-token') || req.query.token;
  if (provided !== token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

module.exports = adminAuth;

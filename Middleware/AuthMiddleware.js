const jwt = require("jsonwebtoken");

class AuthMiddleware {
  constructor() {
    this.verifyToken = this.verifyToken.bind(this);
  }

  verifyToken(req, res, next) {
    try {
      const token = req.headers["authtoken"];
      if (!token) {
        return res.status(401).send('No Token');
      }
      const decoded = jwt.verify(token, 'jwtsecret');
      next();
    } catch (err) {
      console.error(err);
      res.status(500).send('Token Invalid');
    }
  }
}

module.exports = new AuthMiddleware();

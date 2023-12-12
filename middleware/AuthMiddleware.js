const jwt = require("jsonwebtoken");
const config = process.env
console.log(config.SECRET_KEY);
class AuthMiddleware {
  constructor() {
    this.verifyToken = this.verifyToken.bind(this);
  }

  verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send('No Token');
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).send('No Token');
    }
    try {
      jwt.verify(token, config.SECRET_KEY);
      next();
    } catch (error) {
     // console.error(err);
     return res.status(500).json({ status: 'Failed', message: error.message });
    }
  }
}

module.exports = new AuthMiddleware;
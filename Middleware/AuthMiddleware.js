const jwt = require("jsonwebtoken");

class AuthMiddleware {
  constructor() {
    this.verifyToken = this.verifyToken.bind(this);
  }

  verifyToken(req, res, next) {
    try {
      // Retrieve the token from the Authorization header
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).send('No Token');
      }
      // Split the header to extract the token
      const token = authHeader.split(" ")[1];
      if (!token) {
        return res.status(401).send('No Token');
      }
      // check user
      
      next();
    } catch (err) {
     // console.error(err);
     return  res.status(500).send('Token Invalid');
    }
  }
}

module.exports = new AuthMiddleware;
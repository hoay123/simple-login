const jwt = require('jsonwebtoken');
const jwtSecret = 'SUPERSECRETE20220';

//每次get请求时都会验证一些cookies里的令牌是否正确
export default (req, res) => {
  if (req.method === 'GET') {
    if (!('token' in req.cookies)) {
      res.status(401).json({message: 'Unable to auth，no cookies'});
      return;
    }
    let decoded;
    const token = req.cookies.token;
    if (token) {
      try {
        decoded = jwt.verify(token, jwtSecret);
      } catch (e) {
        console.error(e);
      }
    }

    if (decoded) {
      res.json(decoded);
      return;
    } else {
      res.status(401).json({message: 'Unable to auth,cookies wrong'});
    }
  }
};

const jwt = require('jsonwebtoken');

const authMiddleware = require('./asyncHandler')(async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    throw new Error('토큰이 유효하지 않습니다.');
  }

  const token = authorizationHeader.split(' ')[1];
  const secretKey = process.env.JWT_SECRET_KEY;

  // 토큰 검증
  const decoded = jwt.verify(token, secretKey);

  req.userId = decoded.userId;

  next();
});

module.exports = authMiddleware;

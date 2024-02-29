const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
  const authorizationHeader = req.headers?.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      status: 401,
      message: '토큰이 유효하지 않습니다.',
    });
  }

  const token = authorizationHeader.split(' ')[1];
  const secretKey = process.env.JWT_SECRET_KEY;

  try {
    const decoded = await jwt.verify(token, secretKey);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      status: 401,
      message: '인증 실패',
      error: error.message,
    });
  }
};

module.exports = authMiddleware;

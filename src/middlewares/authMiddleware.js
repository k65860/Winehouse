const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // Bearer token에서 token만 추출하기 위함

    if (!token) {
      throw new Error('토큰이 전송되지 않았습니다.');
    }

    const secretKey = process.env.JWT_SECRET_KEY;

    // 토큰 검증
    const decoded = jwt.verify(token, secretKey);

    req.userId = decoded.userId;

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({
      status: 401,
      message: '인증 실패',
      error: error.message,
    });
  }
};

module.exports = authMiddleware;

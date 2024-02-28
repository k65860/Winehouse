const { Router } = require('express');
const UserService = require('../services/userService');
const asyncHandler = require('../middlewares/asyncHandler');
const authMiddleware = require('../middlewares/authMiddleware');

const userRouter = Router();
const userService = new UserService();

// 회원가입
userRouter.post(
  '/signup',
  authMiddleware, //auth 미들웨어 추가
  asyncHandler(async (req, res, next) => {
    const createdUser = await userService.createUser(req.body);
    // 성공 상태 핸들링
    res.status(201).json({
      status: 201,
      message: '회원가입 성공',
      data: createdUser,
    });
  })
);

// 회원정보 조회
userRouter.get(
  '/:userId',
  asyncHandler(async (req, res, next) => {
    const { userId } = req.params;
    const userInfo = await userService.getUserInfo(userId);
    // 유저 ID 확인
    if (!userInfo) {
      const e = new Error('존재하지 않는 회원번호입니다.');
      e.status = 404;
      throw e;
    }
    // 성공 상태 핸들링
    res.status(200).json({
      status: 200,
      message: '유저 정보 조회 성공',
      data: userInfo,
    });
  })
);

// 회원정보 수정
userRouter.patch(
  '/:userId',
  asyncHandler(async (req, res, next) => {
    const { userId } = req.params;
    const updatedInfo = req.body;
    // 유저 ID 확인
    if (!(await userService.getUserInfo(userId))) {
      const e = new Error('존재하지 않는 회원번호입니다.');
      e.status = 404;
      throw e;
    }
    // 수정 진행
    const isUpdated = await userService.updateUserInfo(userId, updatedInfo);
    // 성공 상태 핸들링
    res.status(200).json({
      status: 200,
      message: '유저 정보 수정 성공',
      data: isUpdated,
    });
  })
);

// 회원탈퇴
userRouter.delete(
  '/:userId',
  asyncHandler(async (req, res, next) => {
    const { userId } = req.params;
    // 유저 ID 확인
    if (!(await userService.getUserInfo(userId))) {
      const e = new Error('존재하지 않는 회원번호입니다.');
      e.status = 404;
      throw e;
    }
    const isDeleted = await userService.deleteUser(userId);
    // 성공 상태 핸들링
    res.status(200).json({
      status: 200,
      message: '유저 탈퇴 성공',
      data: isDeleted,
    });
  })
);

// 로그인
userRouter.post(
  '/login',
  asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const userToken = await userService.getUserToken(email, password);
    // 로그인 정보 확인
    switch (userToken) {
      case 1:
        const err1 = new Error('올바르지 않은 ID');
        err1.status = 404;
        throw err1;
      case 2:
        const err2 = new Error('올바르지 않은 비밀번호');
        err2.status = 404;
        throw err2;
      default:
        // 성공 상태 핸들링
        res.status(200).json({
          status: 200,
          message: '유저 로그인 성공',
          token: userToken,
        });
    }
  })
);

//관리자 로그인
userRouter.post(
  '/role',
  asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const adminToken = await userService.getAdminToken(email, password);
    // 로그인 정보 확인
    switch (adminToken) {
      case 1:
        const err1 = new Error('올바르지 않은 ID');
        err1.status = 404;
        throw err1;
      case 2:
        const err2 = new Error('올바르지 않은 비밀번호');
        err2.status = 404;
        throw err2;
      default:
        // 성공 상태 핸들링
        res.status(200).json({
          status: 200,
          message: '관리자 로그인 성공',
          token: adminToken,
        });
    }
  })
);

module.exports = userRouter;

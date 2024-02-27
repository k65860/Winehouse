const { Router } = require('express');
const UserService = require('../services/userService');
const asyncHandler = require('../middlewares/asyncHandler');
const userRouter = Router();
const userService = new UserService(); // UserService 인스턴스 생성

// 회원가입
userRouter.post(
  '/signup',
  asyncHandler(async (req, res) => {
    await userService.createUser(req.body);

    // 회원가입 성공 응답
    res.status(201).json({ result: 'Success' });
  })
);

// 회원정보 조회
userRouter.get(
  '/:userId',
  asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const userInfo = await userService.getUserInfo(userId);

    if (userInfo === null) {
      res.status(404).json({ error: '유저 정보를 찾을 수 없습니다.' });
    } else {
      res.status(200).json(userInfo);
    }
  })
);

// 회원정보 수정
userRouter.patch(
  '/:userId',
  asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const updatedInfo = req.body;

    const isUpdated = await userService.updateUserInfo(userId, updatedInfo);

    if (isUpdated) {
      res.status(200).json(isUpdated); // 수정된 정보를 전송
    } else {
      res.status(404).json({ error: '유저 정보를 찾을 수 없습니다.' });
    }
  })
);

// 회원탈퇴
userRouter.delete(
  '/:userId',
  asyncHandler(async (req, res) => {
    const userId = req.params.userId; // req.params.id에서 req.params.userId로 수정

    const isDeleted = await userService.deleteUser(userId);

    if (isDeleted) {
      res.status(200).json({ result: 'Delete Success' });
    } else {
      res.status(404).json({ error: '유저 정보를 찾을 수 없습니다.' });
    }
  })
);

// 로그인
userRouter.post(
  '/login',
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const userToken = await userService.getUserToken(email, password);

    if (userToken) {
      res.status(200).json({ token: userToken });
    } else {
      res.status(401).json({
        error: '로그인 실패',
      });
    }
  })
);

//관리자 로그인
userRouter.post(
  '/role',
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const adminToken = await userService.getAdminToken(email, password);

    if (adminToken) {
      res.status(200).json({ token: adminToken });
    } else {
      res.status(401).json({
        error: '관리자 로그인 실패',
      });
    }
  })
);

module.exports = userRouter;

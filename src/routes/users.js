const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const UserService = require('../services/userService');

const userService = new UserService(); // UserService 인스턴스 생성

// 회원가입
router.post('/signup', async (req, res) => {
  try {
    await userService.createUser(req.body); // 생성된 인스턴스 사용
    res.status(201).json({ result: 'Success' });
  } catch (error) {
    console.error('회원가입 에러:', error);
    res.status(500).json({ error: '회원가입 실패' });
  }
});

// 회원정보 조회
router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const userInfo = await userService.getUserInfo(userId);

    if (userInfo === null) {
      res.status(404).json({ error: '유저 정보를 찾을 수 없습니다.' });
    } else {
      res.status(200).json(userInfo);
    }
  } catch (error) {
    console.error('유저 정보 조회 에러:', error);
    res.status(500).json({ error: '서버 오류' });
  }
});

// 회원정보 수정
router.patch('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const updatedInfo = req.body;

    const isUpdated = await userService.updateUserInfo(userId, updatedInfo);

    if (isUpdated) {
      res.status(200).json(isUpdated); // 수정된 정보를 전송
    } else {
      res.status(404).json({ error: '유저 정보를 찾을 수 없습니다.' });
    }
  } catch (error) {
    console.error('유저 정보 수정 에러:', error);
    res.status(500).json({ error: '서버 오류' });
  }
});

// 회원탈퇴
router.delete('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId; // req.params.id에서 req.params.userId로 수정

    const isDeleted = await userService.deleteUser(userId);

    if (isDeleted) {
      res.status(200).json({ result: 'Delete Success' });
    } else {
      res.status(404).json({ error: '유저 정보를 찾을 수 없습니다.' });
    }
  } catch (error) {
    console.error('유저 탈퇴 에러:', error);
    res.status(500).json({ error: '서버 오류' });
  }
});

// 로그인
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const userToken = await userService.getUserToken(email, password);

    if (userToken) {
      res.status(200).json({ token: userToken });
    } else {
      res.status(401).json({
        error: '로그인 실패',
      });
    }
  } catch (error) {
    console.error('로그인 에러:', error);
    res.status(500).json({
      error: '로그인 실패: 서버 오류',
    });
  }
});

//관리자 로그인
router.post('/role', async (req, res) => {
  try {
    const { email, password } = req.body;

    const adminToken = await userService.getAdminToken(email, password);

    if (adminToken) {
      res.status(200).json({ token: adminToken });
    } else {
      res.status(401).json({
        error: '관리자 로그인 실패',
      });
    }
  } catch (error) {
    console.error('관리자 로그인 에러:', error);
    res.status(500).json({
      error: '관리자 로그인 실패: 서버 오류',
    });
  }
});

module.exports = router;

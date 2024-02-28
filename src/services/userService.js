const User = require('../db/models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// const mongoose = require('mongoose');
// const ObjectId = mongoose.Types.ObjectId;

class UserService {
  constructor() {
    this.User = User;
  }

  // 회원정보 조회
  async getUserInfo(userId) {
    return await this.User.findOne({ _id: userId });
  }

  // 회원가입
  async createUser(info) {
    const { name, email, password, address, age, tel } = info;
    const hashedPassword = await bcrypt.hash(password, 10);

    return await User.create({
      name,
      email,
      password: hashedPassword,
      address,
      age,
      tel,
    });
  }

  //회원정보 수정
  async updateUserInfo(userId, updatedInfo) {
    if (updatedInfo.password) {
      updatedInfo.password = await bcrypt.hash(updatedInfo.password, 10);
    }
    // findOneAndUpdate 메서드를 사용하여 사용자 정보 업데이트
    return await User.findOneAndUpdate(
      { _id: userId },
      { $set: updatedInfo },
      { new: true }
    );
  }

  //회원탈퇴
  async deleteUser(userId) {
    return await User.findOneAndDelete({ _id: userId });
  }

  // 로그인 시 이메일로 사용자 데이터 조회
  async getUserToken(userId, userPw) {
    const userData = await User.findOne({ email: userId });

    // 사용자 데이터가 없으면 로그인 실패
    if (!userData) {
      return 1;
    }

    // 로그인 시 저장된 비밀번호와 입력된 비밀번호 비교
    const comparePassword = await this.comparePasswords(
      userPw,
      userData.password
    );

    // 비밀번호가 틀리면 로그인 실패
    if (!comparePassword) {
      return 2;
    }

    // 로그인 성공 후 토큰 반환
    const secretKey = process.env.JWT_SECRET_KEY; // env 설정 필요
    return jwt.sign({ userId: userData.email }, secretKey);
  }

  async comparePasswords(inputPassword, hashedPassword) {
    return bcrypt.compare(inputPassword, hashedPassword);
  }

  //관리자 로그인
  async getAdminToken(userId, userPw) {
    const adminData = await User.findOne({ email: userId, role: 'admin' });

    // 관리자 데이터가 없으면 로그인 실패
    if (!adminData) {
      return 1;
    }

    // 로그인 시 저장된 비밀번호와 입력된 비밀번호 비교
    const comparePassword = await this.comparePasswords(
      userPw,
      adminData.password
    );

    // 비밀번호가 틀리면 로그인 실패
    if (!comparePassword) {
      return 2;
    }

    // 로그인 성공 후 토큰 반환
    const secretKey = process.env.JWT_SECRET_KEY; // env 설정 필요
    const adminToken = jwt.sign({ userId: adminData.email }, secretKey);
    return adminToken;
  }
}

module.exports = UserService;

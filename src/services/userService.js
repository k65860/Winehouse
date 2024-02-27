const { User } = require('../db/models/index');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

class UserService {
  constructor() {
    this.User = User; // User 모델 설정 추가
  }

  //회원가입
  async createUser(info) {
    const { name, email, password, address, age, tel } = info;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      address,
      age,
      tel,
    });
    return newUser;
  }

  //회원정보 조회
  async getUserInfo(userId) {
    try {
      const userData = await this.User.findOne({ _id: userId });

      // 사용자 데이터가 없으면 null 반환
      return userData
        ? {
            name: userData.name,
            email: userData.email,
            address: userData.address,
            age: userData.age,
            tel: userData.tel,
          }
        : null;
    } catch (error) {
      console.error('유저 정보 조회 에러:', error);
      throw error;
    }
  }

  //회원정보 수정
  async updateUserInfo(userId, updatedInfo) {
    try {
      if (updatedInfo.password) {
        updatedInfo.password = await bcrypt.hash(updatedInfo.password, 10);
      }
      // findOneAndUpdate 메서드를 사용하여 사용자 정보 업데이트
      const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        { $set: updatedInfo },
        { new: true }
      );

      // 사용자 데이터가 없으면 null 반환
      return updatedUser
        ? {
            name: updatedUser.name,
            email: updatedUser.email,
            address: updatedUser.address,
            age: updatedUser.age,
            tel: updatedUser.tel,
          }
        : null;
    } catch (error) {
      console.error('유저 정보 수정 에러:', error);
      throw error;
    }
  }

  //회원탈퇴
  async deleteUser(userId) {
    try {
      // 주어진 userId가 문자열 형태라면 ObjectId로 변환
      const objectId =
        typeof userId === 'string' ? new ObjectId(userId) : userId;

      // 사용자 데이터 삭제
      const deletedUser = await User.deleteOne({ _id: objectId });

      if (deletedUser.deletedCount === 1) {
        console.log('사용자 데이터 삭제 성공');
        return true;
      } else {
        console.log('해당 id를 가진 사용자를 찾을 수 없습니다.');
        return false;
      }
    } catch (error) {
      console.error('유저 삭제 에러:', error);
      throw error;
    }
  }

  // 로그인 시 이메일로 사용자 데이터 조회
  async getUserToken(userId, userPw) {
    const userData = await User.findOne({ email: userId });

    // 사용자 데이터가 없으면 로그인 실패
    if (!userData) {
      console.log('회원 정보가 존재하지 않습니다.');
      return null;
    }

    // 로그인 시 저장된 비밀번호와 입력된 비밀번호 비교
    const comparePassword = await this.comparePasswords(
      userPw,
      userData.password
    );

    // 비밀번호가 틀리면 로그인 실패
    if (!comparePassword) {
      console.log('비밀번호가 일치하지 않습니다.');
      return null;
    }

    // 로그인 성공 후 토큰 반환
    const secretKey = process.env.JWT_SECRET_KEY; // env 설정 필요
    const userToken = jwt.sign({ userId: userData.email }, secretKey);

    console.log('로그인 성공');
    return userToken;
  }

  async comparePasswords(inputPassword, hashedPassword) {
    return bcrypt.compare(inputPassword, hashedPassword);
  }

  //관리자 로그인
  async getAdminToken(userId, userPw) {
    const adminData = await User.findOne({ email: userId, role: 'admin' });

    // 관리자 데이터가 없으면 로그인 실패
    if (!adminData) {
      console.log('관리자 정보가 존재하지 않습니다.');
      return null;
    }

    // 로그인 시 저장된 비밀번호와 입력된 비밀번호 비교
    const comparePassword = await this.comparePasswords(
      userPw,
      adminData.password
    );

    // 비밀번호가 틀리면 로그인 실패
    if (!comparePassword) {
      console.log('비밀번호가 일치하지 않습니다.');
      return null;
    }

    // 로그인 성공 후 토큰 반환
    const secretKey = process.env.JWT_SECRET_KEY; // env 설정 필요
    const adminToken = jwt.sign({ userId: adminData.email }, secretKey);

    console.log('관리자 로그인 성공');
    return adminToken;
  }
}

module.exports = UserService;

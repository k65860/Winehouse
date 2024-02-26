const { User } = require('../db/models/index');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class UserService {
    //유저 생성
    async createUser(info) {
      const { name, email, password, address, age, tel } = info;
  
      const newUser = await User.create({
        name,
        email,
        password,
        address, 
        age, 
        tel,
      });
  
      return newUser;
    }

    // 로그인 시 이메일로 사용자 데이터 조회
    async getUserToken(userId, userPw) {
        const userData = await User.findOne({ email: userId });
    
        // 사용자 데이터가 없으면 로그인 실패
        if (!userData) {
          console.log("회원 정보가 존재하지 않습니다.");
          return null;
        }
        
        // 로그인 시 저장된 비밀번호와 입력된 비밀번호 비교
        const userPassword = userData.password;
        const comparePassword = await bcrypt.compare(userPw, userPassword);
    
        // 비밀번호가 틀리면 로그인 실패
        if (!comparePassword) {
            console.log("비밀번호가 일치하지 않습니다.");
            return null;
          }
    
        // 로그인 성공 후 토큰 반환
          const secretKey = process.env.JWT_SECRET_KEY; //env 설정 필요
          const userToken = jwt.sign(
              { userId: userData.email, role: userData.role },
              secretKey
          );
      
          console.log("로그인 성공");
          return userToken;

            // To Do
            // 사용자 정보 조회
            // 사용자 정보 수정
            // 사용자 정보 삭제
            // 관리자 기능
        }
module.exports = UserService;
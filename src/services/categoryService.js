/* eslint-disable no-unused-vars */
/* eslint-disable no-return-await */
// 불러오기
const Category = require('../db/models/category');
const Product = require('../db/models/product');

class CategoryService {
  constructor() {
    this.Category = Category;
  }

  // 카테고리명 중복 확인
  async checkCategoryNameDuplicated(categoryName) {
    return await this.Category.findOne({ category_name: categoryName });
  }

  // 카테고리 ID 확인
  async checkCategoryId(categoryId) {
    return await this.Category.findOne({ _id: categoryId });
  }

  // 카테고리 조회
  async getCategoryList() {
    return await this.Category.find();
  }

  // 카테고리 추가
  async addCategory(categoryName) {
    return await this.Category.create({ category_name: categoryName });
  }

  // 카테고리 수정
  async setCategory(categoryId, modifedName) {
    return await this.Category.findOneAndUpdate(
      { _id: categoryId },
      { category_name: modifedName },
    );
  }

  // 카테고리 삭제
  async deleteCategory(categoryId) {
    return await this.Category.findOneAndDelete({ _id: categoryId });
  }
}

module.exports = new CategoryService();

/* eslint-disable no-return-await */
// 불러오기
// eslint-disable-next-line no-unused-vars
const Category = require('../db/models/category');

class CategoryService {
  // singletone pattern
  constructor() {
    this.Category = Category;
  }

  // 카테고리 조회
  async getCategories() {
    return await this.Category.find();
  }

  // 카테고리 추가
  async addCategory(categoryName) {
    return await this.Category.create({ category_name: categoryName });
  }

  // 카테고리 수정
  async setCategory(categoryId, modifedName) {
    // db 수정
    return await this.Category.findOneAndUpdate({ _id: categoryId }, { modifedName });
  }

  // 카테고리 삭제
  async deleteCategory(categoryId) {
    return await this.Category.findOneAndDelete({ _id: categoryId });
  }
}

module.exports = new CategoryService();

/* eslint-disable no-unused-vars */
/* eslint-disable no-return-await */
// 불러오기
const Product = require('../db/models/product');

class ProductService {
  constructor() {
    this.Product = Product;
  }

  // 상품 추가 시 빈 필드 확인
  // eslint-disable-next-line class-methods-use-this
  async checkProductField(reqBody) {
    // 빈값 확인하는 함수
    function isEmpty(value) {
      return value == null || value === '';
    }
    // 빈값 여부 확인
    const is_empty = Object.values(reqBody).some(isEmpty);
    if (!is_empty) {
      return Object.values(reqBody).some(isEmpty);
    } else {
      const e = new Error('상품을 추가하기 위해선 모든 필드가 채워져야 합니다.');
      e.status = 405;
      throw e; 
    }
  }

  // 상품 ID 확인
  async checkProductId(productId) {
    const checkProductId = await this.Product.findOne({ _id: productId });
    if (checkProductId) {
      return checkProductId;
    } else {
      const e = new Error('해당 id의 상품이 없습니다.');
      e.status = 404;
      throw e;
    }
  }

  // 카테고리 소속 상품 유무 확인
  async checkCategoryHasProduct(categoryId) {
    const checkCategoryHasProduct = await this.Product.findOne({ category_id: categoryId });
    if (checkCategoryHasProduct) {
      return checkCategoryHasProduct;
    } else {
      const e = new Error('카테고리에 속한 상품이 남아있습니다.');
      e.status = 405;
      throw e;
    }
  }

  // 상품 목록 (개수 자르기는 여기서 진행)
  async getProductList() {
    return await this.Product.find({});
  }

  // 특정 카테고리에 속한 상품 조회
  async getProductListByCategory(categoryId) {
    return await this.Product.find({ category_id: categoryId });
  }

  // 상품 상세 정보
  async getProductInfo(productId) {
    return await this.Product.findOne({ _id: productId });
  }

  // 상품 추가
  async addProduct(reqBody) {
    // 상품  생성
    return await this.Product.create({
      product_name: reqBody.productName,
      product_price: reqBody.productPrice,
      category_id: reqBody.categoryId,
      product_country: reqBody.productCountry,
      product_grape: reqBody.productGrape,
      product_madeyear: reqBody.productMadeyear,
      product_sweetrate: reqBody.productSweetrate,
      product_sourrate: reqBody.productSourrate,
      product_bodyrate: reqBody.productBodyrate,
    });
  }

  // 상품 수정
  async setProduct(productId, reqBody) {
    return await this.Product.findOneAndUpdate(
      { _id: productId },
      {
        product_name: reqBody.productName,
        product_price: reqBody.productPrice,
        category_id: reqBody.categoryId,
        product_country: reqBody.productCountry,
        product_grape: reqBody.productGrape,
        product_madeyear: reqBody.productMadeyear,
        product_sweetrate: reqBody.productSweetrate,
        product_sourrate: reqBody.productSourrate,
        product_bodyrate: reqBody.productBodyrate,
        // updatedAt: Date.now,
      },
    );
  }

  // 상품 삭제
  async deleteProduct(productId) {
    return await this.Product.deleteOne({ _id: productId });
  }
}

module.exports = new ProductService();

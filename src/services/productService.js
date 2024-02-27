/* eslint-disable no-unused-vars */
/* eslint-disable no-return-await */
// 불러오기
const Category = require('../db/models/category');
const Product = require('../db/models/product');

class ProductService {
  constructor() {
    this.Product = Product;
  }

  // 상품 추가 시 빈 필드 확인
  // eslint-disable-next-line class-methods-use-this
  async checkProductField(
    productName,
    productPrice,
    categoryId,
    productCountry,
    productGrape,
    productMadeyear,
    productSweetrate,
    productSourrate,
    productBodyrate,
  ) {
    // 빈값 확인하는 함수
    function isEmpty(value) {
      return value == null || value === '';
    }
    // 빈값 여부 확인
    return Object.values(
      productName,
      productPrice,
      categoryId,
      productCountry,
      productGrape,
      productMadeyear,
      productSweetrate,
      productSourrate,
      productBodyrate,
    ).some(isEmpty);
  }

  // 상품 ID 확인
  async checkProductId(productId) {
    return await this.Product.findOne({ _id: productId });
  }

  // 카테고리 소속 상품 유무 확인
  async checkCategoryHasProduct(categoryId) {
    return await this.Product.findOne({ category_id: categoryId });
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
  async addProduct(
    productName,
    productPrice,
    categoryId,
    productCountry,
    productGrape,
    productMadeyear,
    productSweetrate,
    productSourrate,
    productBodyrate,
  ) {
    // 상품  생성
    return await this.Product.create({
      product_name: productName,
      product_price: productPrice,
      category_id: categoryId,
      product_country: productCountry,
      product_grape: productGrape,
      product_madeyear: productMadeyear,
      product_sweetrate: productSweetrate,
      product_sourrate: productSourrate,
      product_bodyrate: productBodyrate,
    });
  }

  // 상품 수정
  async setProduct(
    productId,
    productName,
    productPrice,
    categoryId,
    productCountry,
    productGrape,
    productMadeyear,
    productSweetrate,
    productSourrate,
    productBodyrate,
  ) {
    return await this.Product.findOneAndUpdate(
      { _id: productId },
      {
        product_name: productName,
        product_price: productPrice,
        category_id: categoryId,
        product_country: productCountry,
        product_grape: productGrape,
        product_madeyear: productMadeyear,
        product_sweetrate: productSweetrate,
        product_sourrate: productSourrate,
        product_bodyrate: productBodyrate,
        // updatedAt: Date.now,
      },
    );
  }

  // 상품 삭제
  async deleteProduct(productId) {
    const deletedProduct = await this.Product.deleteOne({ _id: productId });
    return deletedProduct;
  }
}

module.exports = new ProductService();

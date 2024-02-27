/* eslint-disable no-unused-vars */
const { Router } = require('express');
const ProductService = require('../services/productService');
const CategoryService = require('../services/categoryService');
const asyncHandler = require('../middlewares/asyncHandler');
const Product = require('../db/models/product');
const Category = require('../db/models/category');
// const adminAuth = require('../middlewares/authMiddleware');

const productRouter = Router();

// 상품 목록 가져오기
productRouter.get('/', asyncHandler(async (req, res, next) => {
  const productList = await ProductService.getProductList();
  // 성공 상태 핸들링
  res.status(200).json({
    status: 200,
    message: '전체 상품 목록 조회 성공',
    data: productList,
  });
}));

// 특정 카테고리 상품 목록 확인
productRouter.get('/:categoryId', asyncHandler(async (req, res, next) => {
  const { categoryId } = req.params;
  // 카테고리 유무 확인
  if (!(await CategoryService.checkCategoryId(categoryId))) {
    const e = new Error('해당 카테고리의 id가 없습니다.');
    e.status = 404;
    throw e;
  }
  const productListOfCategory = await ProductService.getProductListByCategory(categoryId);
  // 성공 상태 핸들링
  res.status(200).json({
    status: 200,
    message: '카테고리별 상품 목록 조회 성공',
    data: productListOfCategory,
  });
}));

// 상품 상세 페이지 열람
productRouter.get('/info/:productId', asyncHandler(async (req, res, next) => {
  const { productId } = req.params;
  // 상품 ID 확인
  if (!(await ProductService.checkProductId(productId))) {
    const e = new Error('해당 id의 상품이 없습니다.');
    e.status = 404;
    throw e;
  }
  const productInfo = await ProductService.getProductInfo(productId);
  // 성공 상태 핸들링
  res.status(200).json({
    status: 200,
    message: '상품 상세페이지 조회 성공',
    data: productInfo,
  });
}));

// 상품 추가
productRouter.post('/', asyncHandler(async (req, res, next) => {
  const {
    productName,
    productPrice,
    categoryId,
    productCountry,
    productGrape,
    productMadeyear,
    productSweetrate,
    productSourrate,
    productBodyrate,
  } = req.body;

  // 상품 빈 필드 확인
  if (await ProductService.checkProductField(
    productName,
    productPrice,
    categoryId,
    productCountry,
    productGrape,
    productMadeyear,
    productSweetrate,
    productSourrate,
    productBodyrate,
  )) {
    const e = new Error('상품을 추가하기 위해선 모든 필드가 채워져야 합니다.');
    e.status = 405;
    throw e;
  }
  // 카테고리 유무 확인
  if (!(await CategoryService.checkCategoryId(categoryId))) {
    const e = new Error('해당 카테고리의 id가 없습니다.');
    e.status = 404;
    throw e;
  }
  const productAdding = await ProductService.addProduct(
    productName,
    productPrice,
    categoryId,
    productCountry,
    productGrape,
    productMadeyear,
    productSweetrate,
    productSourrate,
    productBodyrate,
  );
  // 성공 상태 핸들링
  res.status(201).json({
    status: 201,
    message: '상품 추가 성공',
    data: productAdding,
  });
}));

// 상품 수정
productRouter.patch('/:productId', asyncHandler(async (req, res, next) => {
  const { productId } = req.params;
  const {
    productName,
    productPrice,
    categoryId,
    productCountry,
    productGrape,
    productMadeyear,
    productSweetrate,
    productSourrate,
    productBodyrate,
    updatedAt,
  } = req.body;
  // 상품 ID 확인
  if (!(await ProductService.checkProductId(productId))) {
    const e = new Error('해당 id의 상품이 없습니다.');
    e.status = 404;
    throw e;
  }
  // 카테고리 유무 확인
  if (categoryId && !(await CategoryService.checkCategoryId(categoryId))) {
    const e = new Error('해당 카테고리의 id가 없습니다.');
    e.status = 404;
    throw e;
  }
  const updatedProduct = await ProductService.setProduct(
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
  );
  // 성공 상태 핸들링
  res.status(200).json({
    status: 200,
    message: '상품 수정 완료',
    data: updatedProduct,
  });
}));

// 상품 삭제
productRouter.delete('/:productId', asyncHandler(async (req, res, next) => {
  const { productId } = req.params;
  // 상품 ID 확인
  if (!(await ProductService.checkProductId(productId))) {
    const e = new Error('해당 id의 상품이 없습니다.');
    e.status = 404;
    throw e;
  }
  const deleteProduct = await ProductService.deleteProduct(productId);
  // 성공 상태 핸들링
  res.status(200).json({
    status: 200,
    message: '상품 삭제 완료',
    data: deleteProduct,
  });
}));

module.exports = productRouter;

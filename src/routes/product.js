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
  // 전체 상품 목록 호출
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
  await CategoryService.checkCategoryId(categoryId);
  // 해당 카테고리 상품 목록 호출
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
  await ProductService.checkProductId(productId);
  // 해당 상품 상세페이지 호출
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
  // 상품 빈 필드 확인
  await ProductService.checkProductField(req.body);
  // 카테고리 유무 확인
  await CategoryService.checkCategoryId(req.body.categoryId);
  // 상품 추가 진행
  const productAdding = await ProductService.addProduct(req.body);
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
  // 상품 ID 확인
  await ProductService.checkProductId(productId);
  // 카테고리 유무 확인 (있다면)
  if (req.params.category_id) await CategoryService.checkCategoryId(req.params.category_id);
  // 상품 수정 진행
  const updatedProduct = await ProductService.setProduct(productId,req.body);
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
  await ProductService.checkProductId(productId);
  // 상품 삭제 진행
  const deleteProduct = await ProductService.deleteProduct(productId);
  // 성공 상태 핸들링
  res.status(200).json({
    status: 200,
    message: '상품 삭제 완료',
    data: deleteProduct,
  });
}));

module.exports = productRouter;

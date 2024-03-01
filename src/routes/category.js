/* eslint-disable no-unused-vars */
const { Router } = require('express');
const ProductService = require('../services/productService');
const CategoryService = require('../services/categoryService');

const asyncHandler = require('../middlewares/asyncHandler');
const authAdminMiddleware = require('../middlewares/authAdminMiddleware');

const Product = require('../db/models/product');
const Category = require('../db/models/category');

const categoryRouter = Router();

// 카테고리 조회
categoryRouter.get('/', asyncHandler(async (req, res, next) => {
  // 전체 카테고리 조회
  const categoryList = await CategoryService.getCategoryList();
  // 성공 상태 핸들링
  res.status(200).json({
    status: 200,
    message: '전체 카테고리 목록 조회 성공',
    data: categoryList,
  });
}));

// 카테고리 추가 -> admin 한정 (추후 어드민 확인 절차 추가 필요)
categoryRouter.post('/',
  authAdminMiddleware,
  asyncHandler(async (req, res, next) => {
  const { categoryName } = req.body;
  // 카테고리명 중복 확인
  await CategoryService.checkCategoryNameDuplicated(categoryName);
  // 추가 진행
  const categoryAdding = await CategoryService.addCategory(categoryName);
  // 성공 상태 핸들링
  res.status(201).json({
    status: 201,
    message: '카테고리 추가 성공',
    data: categoryAdding,
  });
}));

// 카테고리 수정 -> admin 한정 (추후 어드민 확인 절차 추가 필요)
categoryRouter.patch('/:categoryId',
  authAdminMiddleware,
  asyncHandler(async (req, res, next) => {
  const { categoryId } = req.params;
  const { modifedName } = req.body;
  // 카테고리 ID 확인
  await CategoryService.checkCategoryId(categoryId);
  // 카테고리명 중복 확인
  await CategoryService.checkCategoryNameDuplicated(modifedName);
  // 카테고리 수정 진행
  const updateCategory = await CategoryService.setCategory(categoryId, modifedName);
  // 성공 상태 핸들링
  res.status(200).json({
    status: 200,
    message: '카테고리 수정 완료',
    data: updateCategory,
  });
}));

// 카테고리 삭제 -> admin 한정 (추후 어드민 확인 절차 추가 필요)
categoryRouter.delete('/:categoryId',
  authAdminMiddleware,
  asyncHandler(async (req, res, next) => {
  const { categoryId } = req.params;
  // 속한 상품 유무 확인
  await ProductService.checkCategoryHasProduct(categoryId);
  // 카테고리 ID 확인
  await CategoryService.checkCategoryId(categoryId);
  // 카테고리 삭제 진행
  const deleteCategory = await CategoryService.deleteCategory(categoryId);
  // 성공 상태 핸들링
  res.status(200).json({
    status: 200,
    message: '카테고리 삭제 완료',
    data: deleteCategory,
  });
}));

module.exports = categoryRouter;

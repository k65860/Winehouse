/* eslint-disable no-unused-vars */
const { Router } = require('express');
const CategoryService = require('../services/categoryService');
const asyncHandler = require('../middlewares/asyncHandler');
const Product = require('../db/models/product');
const Category = require('../db/models/category');
// const adminAuth = require('../middlewares/authMiddleware');

const categoryRouter = Router();

// 카테고리 조회
categoryRouter.get('/', asyncHandler(async (req, res, next) => {
  const categoryList = await CategoryService.getCategoryList();
  // 성공 상태 핸들링
  res.status(200).json({
    status: 200,
    message: '전체 카테고리 목록 조회 성공',
    data: categoryList,
  });
}));

// 카테고리 추가 -> admin 한정 (추후 어드민 확인 절차 추가 필요)
categoryRouter.post('/', asyncHandler(async (req, res, next) => {
  const { categoryName } = req.body;
  // 카테고리명 중복 확인
  if (await CategoryService.checkCategoryNameDuplicated(categoryName)) {
    const e = new Error('이미 있는 카테고리입니다.');
    e.status = 409;
    throw e;
  }
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
categoryRouter.patch('/:categoryId', asyncHandler(async (req, res, next) => {
  const { categoryId } = req.params;
  const { modifedName } = req.body;
  // 카테고리 ID 확인
  if (await CategoryService.checkCategoryId(categoryId)) {
    const e = new Error('해당 카테고리의 id가 없습니다.');
    e.status = 404;
    throw e;
  }
  // 카테고리명 중복 확인
  if (await CategoryService.checkCategoryNameDuplicated(modifedName)) {
    const e = new Error('이미 있는 카테고리입니다.');
    e.status = 409;
    throw e;
  }
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
categoryRouter.delete('/:categoryId', asyncHandler(async (req, res, next) => {
  const { categoryId } = req.params;
  // 속한 상품 유무 확인
  if (await CategoryService.checkCategoryHasProduct(categoryId)) {
    const e = new Error('카테고리에 속한 상품이 남아있습니다.');
    e.status = 405;
    throw e;
  }
  // ID 확인
  if (await CategoryService.checkCategoryId(categoryId)) {
    const e = new Error('해당 카테고리의 id가 없습니다.');
    e.status = 404;
    throw e;
  }
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

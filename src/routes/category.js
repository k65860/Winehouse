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
  const categoryList = await CategoryService.getCategories();

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
  const categoryNameExisted = await Category.findOne({ category_name: categoryName });
  console.log(categoryNameExisted);
  if (categoryNameExisted) {
    res.status(409).json({
      status: 409,
      message: '이미 있는 카테고리입니다.',
    });
  }
  // 추가 진행
  const categoryAdding = await CategoryService.addCategory(categoryName);
  res.status(201).json({
    status: 201,
    message: '카테고리 추가 성공',
    data: categoryAdding,
  });
}));

// 카테고리 수정 -> admin 한정 (추후 어드민 확인 절차 추가 필요)
categoryRouter.patch('/', asyncHandler(async (req, res, next) => {
  const { categoryId } = req.params;
  const { modifedName } = req.body;
  const category = await Category.findById(categoryId);
  // ID 확인
  if (!category) {
    res.status(404).json({
      status: 404,
      message: '해당 카테고리의 id가 없습니다.',
    });
  }
  // 카테고리명 중복 확인
  const categoryNameExisted = await Category.findOne({ name: req.body.name });
  if (categoryNameExisted) {
    res.status(409).json({
      status: 409,
      message: '이미 있는 카테고리입니다.',
    });
  }
  // 카테고리 수정 진행
  const updateCategory = await CategoryService.setCategory(categoryId, modifedName);
  res.status(200).json({
    status: 200,
    message: '카테고리 수정 완료',
    data: updateCategory,
  });
}));

// 카테고리 삭제 -> admin 한정 (추후 어드민 확인 절차 추가 필요)
categoryRouter.delete('/:categoryId', asyncHandler(async (req, res, next) => {
  const { categoryId } = req.params.categoryId;
  console.log(categoryId);
  const categoryDeleting = await Category.findById(categoryId);

  const categoryProductExisted = await Product.findOne({ category_id: categoryId });
  // 속한 상품 유무 확인
  if (categoryProductExisted) {
    res.status(405).json({
      status: 405,
      message: '카테고리에 속한 상품이 남아있습니다.',
    });
  }
  // ID 확인
  if (!categoryDeleting) {
    res.status(404).json({
      status: 404,
      message: '해당 카테고리의 id가 없습니다.',
    });
  }
  // 카테고리 삭제 진행
  const deleteCategory = await CategoryService.deleteCategory(categoryId);
  res.status(200).json({
    status: 200,
    message: '카테고리 삭제 완료',
    data: deleteCategory,
  });
}));

module.exports = categoryRouter;

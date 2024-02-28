const express = require('express');
const router = express.Router();
const ProductService = require('../services/productService');
const asyncHandler = require('../middlewares/asyncHandler');

// 상품 목록 조회
router.get('/', asyncHandler(async (req, res) => {
    const products = await ProductService.getProducts();

    res.json(products);
    // res.send('ok');
    // res.render('productList', {products}); // frontend 작성한 상품 목록페이지로 rendering
}));

// 카테고리에 속하는 상품 조회
router.get('/:categoryId/products', asyncHandler(async (req, res) => {
    const { categoryId } = req.params;

    const products = await ProductService.getProductByCategory(categoryId);
    res.json(products);
    // res.send('OK');
}))

// 상품 상세 정보
router.get('/:productId', asyncHandler(async(req, res) => {
    const { productId } = req.params;
    console.log(productId);

    const product = await ProductService.getProductInfo(productId);
    
    // res.render('productInfo', { product }) // frontend 작성한 상세정보페이지로 rendering
    res.json(product);
    // res.send('OK');
}))

module.exports = router;
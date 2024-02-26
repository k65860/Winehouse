const { Product } = require('../db/models/index.js');
const { Category } = require('./db/models/index.js');
class ProductService {
    // 상품 추가
    async createProduct(productName, productPrice, categoryId, productCountry, productGrape, productMadeyear, productSweetrate, productSourrate, productBodyrate, createdAt, updatedAt, deletedAt) {
        try {
            // 카테고리 ID로 카테고리 찾기
            const category = await Category.findByOne({ categoryId });
            if(!category) { 
                throw new Error('카테고리를 찾을 수 없습니다.')
            }
            // 상품  생성
            const product = await Product.create({ 
                productName, 
                productPrice, 
                category: categoryId,
                productCountry,
                productGrape,
                productMadeyear, 
                productSweetrate, 
                productSourrate, 
                productBodyrate, 
                createdAt, 
                updatedAt, 
                deletedAt });
            return product;
        } catch (err){
            throw new Error('상품을 생성하는데 실패했습니다.');
        }
    }

    // 상품 수정
    async updateProduct(shortId, updateFields) {
        try {
            // 수정할 상품 찾기
            const product = await Product.findByOne({ shortId });
            // 상품 있는지 체크하기
            if(!product){
                throw new Error('상품을 찾을 수 없습니다.');
            }
            
            // 상품 수정
            const updatedProduct = await Product.updateOne({shortId}, { productName, productPrice, categoryName, productCountry, productGrape, productMadeyear, productSweetrate, productSourrate, productBodyrate, createdAt, updatedAt, deletedAt })
        } catch(err) {
            throw new Error(`상품 수정 실패했습니다: ${err.message}`);
        }
    }

    // 상품 상세 정보
    async getProductInfo(shortId) {
        try{
            // ID로 상품 조회
            const product = await Product.findByOne({shortId});

            if(!product) {
                throw new Error('상품을 찾을 수 없습니다.')
            }

            return product;
        } catch(err) {
            throw new Error(`상품 정보를 가져올 수 없습니다: ${err.message}`);
        }
    }

    // 특정 카테고리에 속한 상품 조회
    async getProductByCategory(categoryName){
        try{
            // 특정 카테고리 속한 상품 조회
            const products = await Product.find({ categoryName });
            return products;
        } catch (err) {
            throw new Error(`카테고리 속한 상품들을 조회 실패했습니다: ${err}`)
        }
    }

    // 상품 삭제 
    async deleteProduct(shortId) {
        try{
            // 삭제할 상품을 찾아 삭제
            const deletedProduct = await Product.deleteOne({ shortId });
            
            return deletedProduct;
        } catch(error) {
            throw new Error('상품을 삭제할 수 없습니다.');
        }
    }

}

module.exports = ProductService;
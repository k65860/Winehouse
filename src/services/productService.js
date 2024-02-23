const { Product } = require('../db/models/index.js');

class ProductService {

    // 상품 추가
    async createProduct(productName, productPrice, categoryName, productCountry, productGrape, productMadeyear, productSweetrate, productSourrate, productBodyrate, createdAt, updatedAt, deletedAt) {
        try {
            const product = new Product({ productName, productPrice, categoryName, productCountry, productGrape, productMadeyear, productSweetrate, productSourrate, productBodyrate, createdAt, updatedAt, deletedAt });
            await product.save();
            return product;
        } catch (error){
            throw new Error('Failed to create product');
        }
    }

    // 상품 수정
    async updateProduct(shortId, updateFields) {
        try {
            // 수정할 상품 찾기
            const product = await Product.findById(shortId);
            // 상품 있는지 체크하기
            if(!product){
                throw new Error('Failed to fine product');
            }

            // 수정 내용 적용
            Object.keys(updateFields). forEach((key) => {
                product[key] = updateFields[key];
            })

            // 제품 저장하고 수정된 제품 반환
            return await product.save();
        } catch(error) {
            throw new Error(`Failed to update: ${error.message}`);
        }
    }

    // 상품 삭제 
    async deleteProduct(shortId) {
        try{
            // 삭제할 상품을 찾아 삭제
            const deletedProduct = await Product.findByIdAndDelete(shortId);
            return deletedProduct;
        } catch(error) {
            throw new Error('Failed to delete product');
        }
    }

}

module.exports = ProductService;
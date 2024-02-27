const { Product, Category } = require('../db/models/index.js');

class ProductService {
    // 상품 추가
    async createProduct(productName, productPrice, categoryId, productCountry, productGrape, productMadeyear, productSweetrate, productSourrate, productBodyrate) {
        try {
            // 카테고리 ID로 카테고리 찾기
            const category = await Category.findOne({ _id: categoryId });
            if(!category) { 
                throw new Error('카테고리를 찾을 수 없습니다.')
            }


            // 상품  생성
            const product = await Product.create({ 
                productName, 
                productPrice, 
                categoryId: category._id,
                productCountry,
                productGrape,
                productMadeyear, 
                productSweetrate, 
                productSourrate, 
                productBodyrate,
            });

            console.log(product);    
            return product;
        } catch (err){
            console.log(err);
            throw new Error('상품을 생성하는데 실패했습니다.');
        }
    }

    // 상품 수정
    async updateProduct(productId, productName, productPrice, categoryId, productCountry, productGrape, productMadeyear, productSweetrate, productSourrate, productBodyrate, updatedAt) {
        try {
            const updatedProduct = await Product.findOneAndUpdate(
                { _id: productId },
                { 
                    productName, 
                    productPrice,
                    categoryId, 
                    productCountry,
                    productGrape, 
                    productMadeyear, 
                    productSweetrate, 
                    productSourrate, 
                    productBodyrate, 
                    updatedAt
                },
                { new: true } // 업데이트 된 문서 반환
            );
     
            return updatedProduct;
        } catch(err) {
            
            throw new Error(`상품 수정하는데 실패했습니다: ${err.message}`);
        }
    }

    // 상품 상세 정보
    async getProductInfo(productId) {
        try{
            // ID로 상품 조회
            const product = await Product.findOne({_id:productId});

            if(!product) {
                throw new Error('상품을 찾을 수 없습니다.')
            }

            return product;
        } catch(err) {
            throw new Error(`상품 정보를 가져올 수 없습니다: ${err.message}`);
        }
    }

    // 상품 목록
    async getProducts() {
        try {
            const products = await Product.find({});

            return products;
        } catch(err){
            throw new Error('상품 목록 가져오는데 실패했습니다.')
        }
    }

    // 특정 카테고리에 속한 상품 조회
    async getProductByCategory(categoryId){
        try{
            // 카테고리 ID로 카테고리 찾기
            const category = await Category.findOne({ _id: categoryId });
            if(!category) { 
                throw new Error('카테고리를 찾을 수 없습니다.')
            }
            console.log(category);
            // 해당 카테고리 상품 조회
            const products = await Product.find({ categoryId: category._id });

            return products;
        } catch (err) {
            throw new Error(`카테고리 속한 상품들을 조회 실패했습니다: ${err}`)
        }
    }

    // 상품 삭제 
    async deleteProduct(shortId) {
            // 삭제할 상품을 찾아 삭제
            const deletedProduct = await Product.deleteOne({ shortId });
            
            return deletedProduct;
    }

}

module.exports = new ProductService();
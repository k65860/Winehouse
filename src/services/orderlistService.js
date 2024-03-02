/* eslint-disable no-unused-vars */
/* eslint-disable no-return-await */
// 불러오기
const Orderlist = require('../db/models/orderlist');
const product = require('../db/models/product');

class OrderlistService {
    constructor() {
      this.Orderlist = Orderlist;
    }

    // 주문의 총 상품 수와 가격 도출
    async getOrderQuntity(orderId) {
        const orderlistOfOrder = await this.Orderlist.find({ order_id: orderId });
        const orderPrice = orderlistOfOrder.reduce((sumPrice, product) => {
            return sumPrice + product.product_price * product.product_num;
        }, 0 )
        const orderNum = orderlistOfOrder.reduce((sumNum, product) => {
            return sumNum + product.product_num;
        }, 0 )
        return {
            orderPrice: orderPrice,
            orderNum: orderNum,
        }
    }

    // 특정 주문의 상품 목록 조회
    async getOrderlistOfOrder(orderId) {
    return await this.Orderlist.find({ order_id: orderId });
    }
    
    // 주문 목록 생성
    async addOrderlist(orderId, productOrder) {
        return await this.Orderlist.create({
            order_id: orderId,
            product_id: productOrder.product_id,
            product_num: productOrder.product_num,
            product_price: productOrder.product_price,
        });
    }

    // 주문 목록 삭제
    async deleteOrderlist(orderId) {
        return await this.Orderlist.deleteMany({ _id: orderId });
    }
}

module.exports = new OrderlistService();

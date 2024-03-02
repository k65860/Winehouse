/* eslint-disable no-unused-vars */
/* eslint-disable no-return-await */
// 불러오기
const Delivery = require('../db/models/delivery');

class DeliveryService {
    constructor() {
        this.Delivery = Delivery;
    }

    // 특정 주문의 배송 상태 조회
    async getDeliveryOfOrder(orderId) {
        const checkDelivery = await this.Delivery.findOne({ order_id: orderId });
        if (checkDelivery) {
            return checkDelivery;
          } else {
            const e = new Error('해당 id의 배송정보가 없습니다.');
            e.status = 404;
            throw e;
          }
    }

    // 특정 주문의 배송 상태 조회 및 수정 가능 여부 판별
    async getDeliveryOfOrderCanModify(orderId) {
        const canModify = await this.Delivery.findOne({ order_id: orderId });
        if(canModify.delivery_status === 1){
            return canModify;
        } else {
            const e = new Error('배송이 시작되었습니다.');
            e.status = 405;
            throw e;
        }
    }
    
    // 배송 상태 생성
    async addDelivery(userId, orderId) {
        return await this.Delivery.create({
            order_id: orderId,
            user_id: userId,
        });
    }

    // 배송 상태 수정
    async setDelivery(deliveryId, reqBody) {
        return await this.Delivery.findOneAndUpdate(
        { _id: deliveryId },
        { delivery_status: reqBody.updateStatus },
        );
    }

    // 배송 상태 삭제
    async deleteDelivery(orderId) {
        return await this.Delivery.deleteOne({ _id: orderId });
    }
}

module.exports = new DeliveryService();
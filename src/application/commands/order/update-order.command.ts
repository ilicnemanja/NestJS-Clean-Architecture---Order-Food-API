import { Injectable } from '@nestjs/common';
import { Order } from '../../../domain/entities/order.entity';
import { OrderRepository } from '../../../domain/repositories/order.repository';

@Injectable()
export class UpdateOrderCommand {
    constructor(private readonly orderRepository: OrderRepository) {}

    async execute(id: number, totalAmount: number): Promise<Order> {
        const order = await this.orderRepository.findById(id);
        if (!order) {
            throw new Error('Order not found');
        }
        order.totalAmount = totalAmount;
        return this.orderRepository.save(order);
    }
}

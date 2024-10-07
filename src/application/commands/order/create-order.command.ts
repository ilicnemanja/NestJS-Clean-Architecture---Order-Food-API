import { Injectable } from '@nestjs/common';
import { Order } from '../../../domain/entities/order.entity';
import { OrderRepository } from '../../../domain/repositories/order.repository';

@Injectable()
export class CreateOrderCommand {
    constructor(private readonly orderRepository: OrderRepository) {}

    async execute(userId: number, totalAmount: number): Promise<Order> {
        const order = new Order();
        order.userId = userId;
        order.totalAmount = totalAmount;
        return this.orderRepository.save(order);
    }
}

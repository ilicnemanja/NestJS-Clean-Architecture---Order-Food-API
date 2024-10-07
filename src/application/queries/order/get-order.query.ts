import { Injectable } from '@nestjs/common';
import { Order } from '../../../domain/entities/order.entity';
import { OrderRepository } from '../../../domain/repositories/order.repository';

@Injectable()
export class GetOrderQuery {
    constructor(private readonly orderRepository: OrderRepository) {}

    async execute(id: number): Promise<Order | null> {
        return this.orderRepository.findById(id);
    }
}

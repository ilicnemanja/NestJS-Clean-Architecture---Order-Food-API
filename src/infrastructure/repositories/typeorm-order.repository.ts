import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../../domain/entities/order.entity';
import { OrderRepository } from '../../domain/repositories/order.repository';
import { Repository } from 'typeorm';

@Injectable()
export class TypeOrmOrderRepository implements OrderRepository {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
    ) {}

    async save(order: Order): Promise<Order> {
        return this.orderRepository.save(order);
    }

    async findById(id: number): Promise<Order | null> {
        return this.orderRepository.findOneBy({ id });
    }
}

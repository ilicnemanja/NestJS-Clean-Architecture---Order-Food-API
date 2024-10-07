import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CreateOrderCommand } from '../../../application/commands/order/create-order.command';
import { GetOrderQuery } from '../../../application/queries/order/get-order.query';
import { Order } from '../../../domain/entities/order.entity';
import { CreateOrderDto } from '../../../application/dtos/order/create-order.dto';

@Controller('orders')
export class OrderController {
    constructor(
        private readonly createOrderCommand: CreateOrderCommand,
        private readonly getOrderQuery: GetOrderQuery,
    ) {}

    @Post()
    async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
        return this.createOrderCommand.execute(createOrderDto.userId, createOrderDto.totalAmount);
    }

    @Get(':id')
    async getOrder(@Param('id') id: number): Promise<Order | null> {
        return this.getOrderQuery.execute(id);
    }
}

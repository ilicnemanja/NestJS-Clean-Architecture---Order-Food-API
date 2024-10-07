import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CreateUserCommand } from '../../../application/commands/user/create-user.command';
import { GetUserQuery } from '../../../application/queries/user/get-user.query';
import { User } from '../../../domain/entities/user.entity';

@Controller('users')
export class UserController {
    constructor(
        private readonly createUserCommand: CreateUserCommand,
        private readonly getUserQuery: GetUserQuery,
    ) {}

    @Post()
    async createUser(@Body('name') name: string): Promise<User> {
        return this.createUserCommand.execute(name);
    }

    @Get(':id')
    async getUser(@Param('id') id: number): Promise<User | null> {
        return this.getUserQuery.execute(id);
    }
}

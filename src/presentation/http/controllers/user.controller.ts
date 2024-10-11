import { Controller, Post, Body, Get, Param, NotFoundException, HttpException, Delete } from '@nestjs/common';
import { CreateUserCommand } from '../../../application/commands/user/create-user.command';
import { DeleteUserCommand } from 'src/application/commands/user/delete-user.command';
import { GetUserQuery } from '../../../application/queries/user/get-user.query';
import { User } from '../../../domain/entities/user.entity';
import { NewRelicLoggerService } from 'src/infrastructure/logger/newrelic-logger.service';

@Controller('users')
export class UserController {
    constructor(
        private readonly createUserCommand: CreateUserCommand,
        private readonly deleteUserCommand: DeleteUserCommand,
        private readonly getUserQuery: GetUserQuery,
        private readonly logger: NewRelicLoggerService,
    ) {}

    @Post()
    async createUser(@Body('name') name: string): Promise<User> {
        return this.createUserCommand.execute(name);
    }

    @Get(':id')
    async getUser(@Param('id') id: number): Promise<User | null> {
        try {
            this.logger.log(`Method getUser called with id ${id}`);
            const user = await this.getUserQuery.execute(id);

            if (!user) {
                throw new NotFoundException('User not found');
            }

            this.logger.log(`User with id ${user.id} found`);

            return user;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            } else if (error instanceof HttpException) {
                throw error;
            }
            
            throw new HttpException(error.message, 500);
        }
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: number): Promise<void> {
        try {
            return this.deleteUserCommand.execute(id);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new HttpException(error.message, 500);
        }
    }
}

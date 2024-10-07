import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './presentation/http/filters/http-exceptions.filter';

// Helper
import { customFactory } from './shared/helpers/index';

// Domain
import { User } from './domain/entities/user.entity';
import { Order } from './domain/entities/order.entity';

// Application
import {
  CreateUserCommand,
  UpdateUserCommand,
  DeleteUserCommand,
  CreateOrderCommand,
  UpdateOrderCommand,
} from './application/commands/index';
import {
  GetUserQuery,
  GetOrderQuery
} from './application/queries/index'

// Infrastructure
import { TypeOrmUserRepository, TypeOrmOrderRepository } from './infrastructure/repositories/index';

// Presentation
import { UserController } from './presentation/http/controllers/user.controller';
import { OrderController } from './presentation/http/controllers/order.controller';
import { MyLogger } from './infrastructure/logger/console-logger.service';
import { NewRelicLoggerService } from './infrastructure/logger/newrelic-logger.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3336,
      database: 'food',
      username: 'root',
      password: '1234',
      synchronize: true,
      autoLoadEntities: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    TypeOrmModule.forFeature([User, Order]),
  ],
  controllers: [UserController, OrderController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },

    // -- Infrastructure --
    TypeOrmUserRepository,
    TypeOrmOrderRepository,
    MyLogger,
    NewRelicLoggerService,

    // -- Application -- Commands
    customFactory(CreateUserCommand, TypeOrmUserRepository),
    customFactory(UpdateUserCommand, TypeOrmUserRepository),
    customFactory(DeleteUserCommand, TypeOrmUserRepository),
    customFactory(CreateOrderCommand, TypeOrmOrderRepository),
    customFactory(UpdateOrderCommand, TypeOrmOrderRepository),

    // -- Application -- Queries
    customFactory(GetUserQuery, TypeOrmUserRepository),
    customFactory(GetOrderQuery, TypeOrmOrderRepository),
  ],
})
export class AppModule {}

import { Injectable } from '@nestjs/common';
import { User } from '../../../domain/entities/user.entity';
import { UserRepository } from '../../../domain/repositories/user.repository';

@Injectable()
export class CreateUserCommand {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(name: string): Promise<User> {
        const user = new User();
        user.name = name;
        return this.userRepository.save(user);
    }
}

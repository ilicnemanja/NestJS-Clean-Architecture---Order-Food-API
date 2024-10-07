import { Injectable } from '@nestjs/common';
import { User } from '../../../domain/entities/user.entity';
import { UserRepository } from '../../../domain/repositories/user.repository';

@Injectable()
export class UpdateUserCommand {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(id: number, name: string): Promise<User> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new Error('User not found');
        }
        user.name = name;
        return this.userRepository.save(user);
    }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../../domain/repositories/user.repository';

@Injectable()
export class DeleteUserCommand {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(id: number): Promise<void> {
        const user = await this.userRepository.findById(id);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return this.userRepository.delete(id);
    }
}

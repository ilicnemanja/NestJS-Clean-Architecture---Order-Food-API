import { Injectable } from '@nestjs/common';
import { User } from '../../../domain/entities/user.entity';
import { UserRepository } from '../../../domain/repositories/user.repository';

@Injectable()
export class GetUserQuery {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(id: number): Promise<User | null> {
        return this.userRepository.findById(id);
    }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/repositories/user.repository';
import { Repository } from 'typeorm';

@Injectable()
export class TypeOrmUserRepository implements UserRepository {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async save(user: User): Promise<User> {
        return this.userRepository.save(user);
    }

    async findById(id: number): Promise<User | null> {
        return this.userRepository.findOneBy({ id });
    }

    async delete(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }
}

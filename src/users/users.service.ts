import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) {}

    async create(name: string): Promise<User> {
        const user = this.usersRepository.create({ name })
        return this.usersRepository.save(user)
    }

    async findAll(): Promise<User[]> {
        return this.usersRepository.find()
    }

    async findOne(id: number): Promise<User> {
        return this.usersRepository.findOne({ where: { id } })
    }
}

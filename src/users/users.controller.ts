import { Controller, Post, Body, Get } from '@nestjs/common'
import { UsersService } from './users.service'
import { User } from './entities/user.entity'

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    create(@Body('name') name: string): Promise<User> {
        return this.usersService.create(name)
    }

    @Get()
    findAll(): Promise<User[]> {
        return this.usersService.findAll()
    }
}

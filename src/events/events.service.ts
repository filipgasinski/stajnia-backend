import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, Between } from 'typeorm'
import { Event } from './entitites/event.entity'
import { User } from 'src/users/entities/user.entity'
import { Horse } from 'src/horses/entities/horses.entity'
import { HorsesService } from 'src/horses/horses.service'

@Injectable()
export class EventsService {
    constructor(
        @InjectRepository(Event)
        private eventsRepository: Repository<Event>,
        private horsesService: HorsesService,
    ) {}

    // Liczenie koni
    async countHorsesInHour(startDate: Date, userId: number): Promise<number> {
        const startOfHour = new Date(startDate)
        startOfHour.setMinutes(0, 0, 0)

        const endOfHour = new Date(startDate)
        endOfHour.setMinutes(59, 59, 999)

        return this.eventsRepository.count({
            where: {
                startDate: Between(startOfHour, endOfHour),
            user: {
                id: userId,
            },
            },
        })
    }
 
    async create(
        title: string, 
        description: string, 
        startDate: Date, 
        endDate: Date, 
        user: User,
        horse: Horse
    ): Promise<Event> {
        // Sprawdź maxEvents of horses
        const canAssign = await this.horsesService.canAssignHorse(horse.id, startDate)

        if(!canAssign) {
            throw new Error('Koń osiągnał maksymalną liczbę jazd na dzisiaj')
        }

        const event = this.eventsRepository.create({ 
            title, 
            description, 
            startDate, 
            endDate, 
            user,
            horse
        })
        
        return this.eventsRepository.save(event)
    }

    async findAll(): Promise<Event[]> {
        return this.eventsRepository.find({ relations: ['user', 'horse'] })
    }
}

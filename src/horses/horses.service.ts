import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Horse } from "./entities/horses.entity"
import { Event } from "src/events/entitites/event.entity"

@Injectable()
export class HorsesService {
    constructor(
        @InjectRepository(Horse)
        public readonly horsesRepository: Repository<Horse>,
        @InjectRepository(Event)
        private readonly eventsRepository: Repository<Event>,
    ) {}

    async create(name: string, maxDailyRides: number): Promise<Horse> {
        const horse = this.horsesRepository.create({ name, maxDailyRides })
        return this.horsesRepository.save(horse)
    }

    async canAssignHorse(horseId: number, date: Date): Promise<boolean> {
        const horse = await this.horsesRepository.findOne({ where: { id: horseId }, relations: ['events'] })

        if(!horse) {
            throw new Error('Horse not found')
        }

        // Max events for one horse
        const eventsOnSameDay = horse.events.filter(event => {
            const eventDate = new Date(event.startDate)
            return eventDate.toDateString() === date.toDateString()
        })

        return eventsOnSameDay.length < horse.maxDailyRides
    }

    async findAll(): Promise<Horse[]> {
        return this.horsesRepository.find()
    }

    findOne(horseId: number): Promise<Horse> {
        return this.horsesRepository.findOne({ where: { id: horseId } })
    }
 }

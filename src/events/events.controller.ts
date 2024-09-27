import { Controller, Post, Body, Get, BadRequestException } from '@nestjs/common'
import { EventsService } from './events.service'
import { UsersService } from 'src/users/users.service'
import { Event } from './entitites/event.entity'
import { HorsesService } from 'src/horses/horses.service'
import { addMinutes, addHours } from 'date-fns'

@Controller('events')
export class EventsController {
    constructor(
        private readonly eventsService: EventsService,
        private readonly usersService: UsersService,
        private readonly horsesService: HorsesService
    ) {}

    @Post()
    async create(
        @Body('title') title: string,
        @Body('description') description: string,
        @Body('startDate') startDate: Date,
        @Body('duration') duration: "30 minutes" | "1 hour",
        @Body('userId') userId: number,
        @Body('horseId') horseId: number,
        @Body('force') force: boolean = false, // Parametr dla potwierdzenia czy chce się więcej koni na jeździe
    ): Promise<Event> {
        const user = await this.usersService.findOne(userId)
        const horse = await this.horsesService.findOne(horseId)
        const start = new Date(startDate)

        // Sprawdzenie liczby koni w ciągu godziny
        const horseCount = await this.eventsService.countHorsesInHour(start, userId)

        if(horseCount >= 3 && !force) { // Jeżeli max 3 i chce się dać więcej
            throw new BadRequestException('Masz już zaplanowane 3 konie na tą godzinę. Czy na pewno chcesz dodać więcej?')
        }

        // Długość trwania zajęć
        let end: Date
        if (duration === "1 hour") {
            end = addHours(start, 1) // Dodaj 1 godzinę
        } else if (duration === "30 minutes") {
            end = addMinutes(start, 30) // Dodaj 30 minut
        }

        return this.eventsService.create(title, description, start, end, user, horse)
    }

    @Get()
    findAll(): Promise<Event[]> {
        return this.eventsService.findAll()
    }
}

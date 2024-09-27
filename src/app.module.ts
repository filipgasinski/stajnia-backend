import { Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersModule } from './users/users.module'
import { EventsModule } from './events/events.module'
import { HorsesService } from './horses/horses.service'
import { HorsesModule } from './horses/horses.module'
import { Horse } from './horses/entities/horses.entity'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Wszystkie encje uwzględnione
      synchronize: true,
    }),
    UsersModule,
    EventsModule,
    HorsesModule
  ],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly horsesService: HorsesService) {}

  async onModuleInit() {
      await this.seedHorses()
  }

  private async seedHorses() { // Pomyśl o migracji w sql albo w orm !!! - to jest standard, dump - sprawdź
    const horses = await this.horsesService.findAll()
    if (horses.length === 0) {
      const defaultHorses = [
        { name: "Barbi", maxDailyRides: 5, color: '#ff3da0' }, // Różowy
        { name: "King", maxDailyRides: 5, color: '#1eb852'},  // Zielony
        { name: "Wendy", maxDailyRides: 5, color: '#ff891a'}, // Pomarańczowy
        { name: "Grobla", maxDailyRides: 5, color: '#e400fa'}, // Fioletowy
        { name: "Gwiazdka", maxDailyRides: 5, color: '#3f00c2'}, // Granatowy
        { name: "Lolek", maxDailyRides: 5, color: '#1a94ff'} // Niebieski
      ]

      for (const horseData of defaultHorses) { // wrzuc w konstruktor obiektu albo metoda która to ustawia
        const horse = new Horse()
        horse.name = horseData.name
        horse.maxDailyRides = horseData.maxDailyRides
        await this.horsesService.horsesRepository.save(horse)
      } // https://stackoverflow.com/questions/62130381/how-to-initialize-an-entity-passing-in-an-object-using-typeorm
    }
  }
}  

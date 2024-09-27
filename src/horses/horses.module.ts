import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Horse } from './entities/horses.entity'
import { HorsesService } from './horses.service'
import { Event } from 'src/events/entitites/event.entity'
import { EventsModule } from 'src/events/events.module'

@Module({
  imports: [
        TypeOrmModule.forFeature([Horse, Event]),
        forwardRef(() => EventsModule),
    ],
  providers: [HorsesService],
  exports: [HorsesService],  // Eksportuj HorsesService
})
export class HorsesModule {}

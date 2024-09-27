import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Event } from './entitites/event.entity'
import { EventsService } from './events.service'
import { EventsController } from './events.controller'
import { UsersModule } from '../users/users.module'
import { HorsesModule } from 'src/horses/horses.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Event]),
    UsersModule,
    forwardRef(() => HorsesModule)
  ],
  providers: [EventsService],
  controllers: [EventsController],
  exports: [EventsService]
})
export class EventsModule {}

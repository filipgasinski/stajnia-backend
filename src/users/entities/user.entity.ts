import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { Event } from 'src/events/entitites/event.entity'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    name: string

    @OneToMany(() => Event, event => event.user)
    events: Event[]
}
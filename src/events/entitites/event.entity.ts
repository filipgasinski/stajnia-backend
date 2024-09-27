import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { User } from '../../users/entities/user.entity'
import { Horse } from 'src/horses/entities/horses.entity'

@Entity()
export class Event {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column({ nullable: true })
    description: string

    @Column()
    startDate: Date

    @Column()
    endDate: Date

    @ManyToOne(() => User, (user) => user.events, { eager: true })
    user: User

    @ManyToOne(() => Horse, (horse) => horse.events, { eager: true })
    horse: Horse
}
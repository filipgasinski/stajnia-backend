import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { Event } from "src/events/entitites/event.entity"

@Entity()
export class Horse {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    maxDailyRides: number

    @Column({ nullable: true })
    color: string // Dodaj kolory koni - zapisz jako hex i w frontend to się czyta

    @OneToMany(() => Event, (event) => event.horse)
    events: Event[]
}

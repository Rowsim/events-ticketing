import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Booking } from "./Booking"
import { Event } from './Event'

@Entity()
export class Ticket {
    @PrimaryGeneratedColumn()
    id: number

    @Column('float')
    price: number

    @ManyToOne(() => Booking)
    booking?: Booking

    @ManyToOne(() => Event)
    event: Event
}

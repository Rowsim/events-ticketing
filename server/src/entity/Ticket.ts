import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm"
import { Booking } from "./Booking"
import { Event } from './Event'

@Entity()
export class Ticket {
    @PrimaryGeneratedColumn()
    id: number

    @Column('float')
    price: number

    @ManyToOne(() => Booking)
    @JoinColumn()
    booking?: Booking

    @ManyToOne(() => Event)
    @JoinColumn()
    event: Event
}

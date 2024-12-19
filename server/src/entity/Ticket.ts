import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Index } from "typeorm"
import { Booking } from "./Booking"
import { Event } from './Event'

@Index('idx_ticket_complete_reservation', ['complete', 'reservationExpiry'])
@Entity()
export class Ticket {
    @PrimaryGeneratedColumn()
    id: number

    @Column('float')
    price: number

    @Index()
    @ManyToOne(() => Booking)
    booking?: Booking

    @Index()
    @ManyToOne(() => Event)
    event: Event

    @Column('bigint', { nullable: true })
    reservationExpiry?: number

    @Column('boolean', { default: false })
    complete?: boolean
}

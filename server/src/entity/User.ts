import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from "typeorm"
import { Booking } from "./Booking"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(() => Booking, (booking) => booking.user)
    @JoinColumn()
    bookings: Booking[]
}

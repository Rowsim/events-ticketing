import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Index } from "typeorm"
import { Booking } from "./Booking"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Index()
    @Column({ unique: true })
    username: string

    @Column()
    password: string

    @OneToMany(() => Booking, (booking) => booking.user)
    bookings: Booking[]
}

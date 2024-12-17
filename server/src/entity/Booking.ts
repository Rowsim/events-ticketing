import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, ManyToOne } from "typeorm"
import { User } from "./User"
import { Ticket } from "./Ticket"
import { Event } from './Event'

@Entity()
export class Booking {
    @PrimaryGeneratedColumn('uuid')
    id: number

    @ManyToOne(() => Event)
    @JoinColumn()
    event: Event

    @OneToOne(() => User)
    @JoinColumn()
    user: User

    @OneToMany(() => Ticket, (ticket => ticket.booking))
    @JoinColumn()
    tickets: Ticket[]

    @Column()
    complete: boolean

    @Column()
    expiresAt: number
}

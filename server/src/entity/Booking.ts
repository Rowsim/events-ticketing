import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm"
import { User } from "./User"
import { Ticket } from "./Ticket"
import { Event } from './Event'

@Entity()
export class Booking {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => Event)
    event: Event

    @ManyToOne(() => User)
    user: User

    @OneToMany(() => Ticket, (ticket => ticket.booking))
    tickets: Ticket[]

    @Column('boolean', { default: false })
    complete: boolean

    @Column("bigint")
    expiresAt: number
}

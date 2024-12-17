import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm"
import { Venue } from "./Venue"
import { Ticket } from "./Ticket"
import { User } from "./User"

@Entity()
export class Event {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    date: Date

    @ManyToOne(() => Venue)
    venue: Venue

    @OneToMany(() => Ticket, (ticket => ticket.event))
    tickets: Ticket[]

    @ManyToOne(() => User)
    author: User

    @Column()
    imageUrl?: string
}

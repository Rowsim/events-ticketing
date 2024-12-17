import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm"
import { Venue } from "./Venue"
import { Ticket } from "./Ticket"

@Entity()
export class Event {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    date: Date

    @ManyToOne(() => Venue)
    @JoinColumn()
    venue: Venue

    @OneToMany(() => Ticket, (ticket => ticket.event))
    @JoinColumn()
    tickets: Ticket[]

    @Column()
    imageUrl?: string
}

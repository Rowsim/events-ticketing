import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToMany } from "typeorm"
import { Event } from "./Event"

@Entity()
export class Venue {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    location: string

    @OneToMany(() => Event, (event => event.venue))
    @JoinColumn()
    event: Event[]

    @Column()
    imageUrl?: string
}

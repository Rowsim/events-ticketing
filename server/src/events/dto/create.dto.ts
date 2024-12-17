import { Event } from "../../entity/Event";

export class CreateEventDto implements Omit<Event, 'id' | 'venue' | 'tickets' | 'date' | 'author'> {
    name: string
    dateTimestamp: number
    venueId: string
    ticketsToGenerate: {
        [price: string]: number
    }
    userId: string
    imageUrl?: string
}
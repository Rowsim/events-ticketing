import { Event } from "../../entity/Event";

export class CreateEventDto implements Omit<Event, 'id' | 'venue' | 'tickets' | 'date'> {
    name: string
    dateTimestamp: number
    venueId: string
    ticketsToGenerate: {
        [price: string]: number
    }
    imageUrl?: string
}
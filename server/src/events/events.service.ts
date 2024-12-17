import { Inject, Injectable } from '@nestjs/common';
import { Event } from '../entity/Event';
import { PROVIDER_NAMES } from '../provider-constants';
import { EntityManager, Repository } from 'typeorm';
import { CreateEventDto } from './dto/create.dto';
import { Venue } from '../entity/Venue';
import { Ticket } from '../entity/Ticket';
import { User } from '../entity/User';

@Injectable()
export class EventsService {
    constructor(
        @Inject(PROVIDER_NAMES.EVENTS_REPOSITORY) private eventRepository: Repository<Event>,
        @Inject(PROVIDER_NAMES.VENUE_REPOSITORY) private venueRepository: Repository<Venue>,
        @Inject(PROVIDER_NAMES.TICKET_REPOSITORY) private ticketRepository: Repository<Ticket>,
        @Inject(PROVIDER_NAMES.ENTITY_MANAGER) private entityManager: EntityManager,
    ) { }

    async getEventWithAvailableTickets(id: number): Promise<Event> {
        return await this.eventRepository.createQueryBuilder('event')
            .leftJoinAndSelect('event.tickets', 'ticket', 'ticket.booking IS NULL')
            .where('event.id = :id', { id })
            .getOne()
    }

    async getAllEvents(): Promise<Event[]> {
        return await this.eventRepository.find()
    }

    async createEvent(createEventDto: CreateEventDto) {
        const { name, dateTimestamp, ticketsToGenerate, venueId, userId, imageUrl } = createEventDto

        return await this.entityManager.transaction(async (manager) => {
            const venueRepository = manager.getRepository(Venue);
            const venue = await venueRepository.findOneBy({ id: venueId });
            if (!venue) {
                throw new Error(`Venue with ID ${venueId} not found`);
            }

            const eventRepository = manager.getRepository(Event);
            const createdEvent = await eventRepository.save(this.eventRepository.create({
                name,
                date: new Date(dateTimestamp),
                imageUrl,
                venue,
                tickets: [],
                author: { id: userId } as unknown as User
            }))

            const ticketRepository = manager.getRepository(Ticket);
            const ticketsEntities = []
            Object.entries(ticketsToGenerate).map(([priceKey, numberOfTickets]) => {
                ticketsEntities.push(...new Array(numberOfTickets).fill(this.ticketRepository.create({
                    price: Number(priceKey),
                    event: createdEvent
                })))
            })
            await ticketRepository.save(ticketsEntities)
            return createdEvent
        })
    }
}

import { Body, Controller, Get, InternalServerErrorException, NotFoundException, Param, Post } from '@nestjs/common';
import { EventsService } from '../services/events.service';
import { CreateEventDto } from '../dto/create.dto';

@Controller()
export class EventsController {
    constructor(private readonly eventsService: EventsService) { }

    @Get("/event/:eventId")
    async getEvent(@Param('eventId') eventId: string) {
        try {
            const event = await this.eventsService.getEventWithAvailableTickets(Number(eventId))
            if (!event) return new NotFoundException(eventId)
            return JSON.stringify(event)
        } catch (e) {
            console.error(e)
            throw new InternalServerErrorException('Unexpected error');
        }
    }

    @Get("/events")
    async getEvents() {
        try {
            return await this.eventsService.getAllEvents()
        } catch (e) {
            console.error(e)
            throw new InternalServerErrorException('Unexpected error');
        }
    }

    @Post("/event")
    async createEvent(@Body() createEventDto: CreateEventDto) {
        try {
            await this.eventsService.createEvent(createEventDto)
            return 'Created'
        } catch (e) {
            console.error(e)
            throw new InternalServerErrorException('Unexpected error');
        }
    }
}

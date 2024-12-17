import { Body, Controller, Get, InternalServerErrorException, NotFoundException, Param, Post, Req, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller()
export class EventsController {
    constructor(private readonly eventsService: EventsService) { }

    @Get("/event/:eventId")
    async getEvent(@Param('eventId') eventId: string) {
        try {
            const event = await this.eventsService.getEventWithAvailableTickets(Number(eventId))
            if (!event) return new NotFoundException(eventId)
            return event
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

    @UseGuards(AuthGuard)
    @Post("/event")
    async createEvent(@Body() createEventDto: CreateEventDto, @Req() request) {
        try {
            return await this.eventsService.createEvent({ ...createEventDto, userId: request?.user?.sub })
        } catch (e) {
            console.error(e)
            throw new InternalServerErrorException('Unexpected error');
        }
    }
}

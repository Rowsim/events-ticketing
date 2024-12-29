import { Body, Controller, Get, InternalServerErrorException, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { VenuesService } from './venues.service';
import { CreateVenueDto } from './dto/create.dto';

@Controller()
export class VenuesController {
    constructor(private readonly venuesService: VenuesService) { }

    @UseGuards(AuthGuard)
    @Get("/venues/list")
    async getVenueList() {
        try {
            return await this.venuesService.getVenueList()
        } catch (e) {
            console.error(e)
            throw new InternalServerErrorException('Unexpected error');
        }
    }

    @UseGuards(AuthGuard)
    @Post("/venues")
    async createEvent(@Body() createVenueDto: CreateVenueDto) {
        try {
            return await this.venuesService.createVenue(createVenueDto)
        } catch (e) {
            console.error(e)
            throw new InternalServerErrorException('Unexpected error');
        }
    }
}

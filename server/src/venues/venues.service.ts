import { Inject, Injectable } from '@nestjs/common';
import { Event } from '../entity/Event';
import { PROVIDER_NAMES } from '../provider-constants';
import { Repository } from 'typeorm';
import { CreateVenueDto } from './dto/create.dto';


@Injectable()
export class VenuesService {
    constructor(
        @Inject(PROVIDER_NAMES.VENUE_REPOSITORY) private venueRepository: Repository<Event>,
    ) { }

    async getVenueList() {
        return (await this.venueRepository.find({
            select: ['id', 'name']
        }))
    }

    async createVenue(createVenueDto: CreateVenueDto) {
        return await this.venueRepository.save(this.venueRepository.create(createVenueDto))
    }
}

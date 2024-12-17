import { Controller, Get, Post } from "@nestjs/common";
import { BookingsService } from "../services/bookings.service";

@Controller()
export class BookingsController {
    constructor(private readonly bookingsService: BookingsService) { }

    @Get('/bookings')
    async getUserBookings() {

    }

    @Post('/booking')
    async createBooking() {

    }

    @Post('/booking/complete')
    async completeBooking() {
        
    }
}
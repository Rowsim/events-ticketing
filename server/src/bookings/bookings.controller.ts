import { Body, ConflictException, Controller, Get, InternalServerErrorException, Post, Req, UseGuards } from "@nestjs/common";
import { BookingsService } from "./bookings.service";
import { AuthGuard } from "../auth/auth.guard";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { CompleteBookingDto } from "./dto/complete-booking.dto";

@Controller()
export class BookingsController {
    constructor(private readonly bookingsService: BookingsService) { }

    @UseGuards(AuthGuard)
    @Get('/bookings')
    async getUserBookings(@Req() request) {
        try {
            return this.bookingsService.getUserCompleteBookings(request.user.sub)
        } catch (e) {
            console.error(e)
            throw new InternalServerErrorException()
        }
    }

    @UseGuards(AuthGuard)
    @Post('/booking')
    async createBooking(@Body() createBookingDto: CreateBookingDto, @Req() request) {
        const { status, id } = await this.bookingsService.createBooking(createBookingDto.eventId, request.user.sub, createBookingDto.ticketIds).catch((e) => {
            console.error(e)
            throw new InternalServerErrorException()
        })

        if (status !== 'SUCCESS') throw new ConflictException(status)
        return { bookingId: id }
    }

    @Post('/booking/complete')
    async completeBooking(@Body() completeBookingDto: CompleteBookingDto) {
        try {
            await this.bookingsService.confirmBooking(completeBookingDto.bookingId)
        } catch (e) {
            console.error(e)
            throw new InternalServerErrorException()
        }
    }
}
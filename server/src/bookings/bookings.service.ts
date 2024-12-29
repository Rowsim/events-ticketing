import { Inject, Injectable } from "@nestjs/common";
import { Booking } from "../entity/Booking";
import { Repository } from "typeorm";
import { PROVIDER_NAMES } from "../provider-constants";
import { Event } from "../entity/Event";
import { Ticket } from "../entity/Ticket";

const FIFTEEN_MINUTES_MS = 900000

@Injectable()
export class BookingsService {
    constructor(
        @Inject(PROVIDER_NAMES.BOOKING_REPOSITORY) private bookingRepository: Repository<Booking>,
        @Inject(PROVIDER_NAMES.EVENTS_REPOSITORY) private eventsRepository: Repository<Event>,
    ) { }

    async getUserCompleteBookings(userId: number) {
        return await this.bookingRepository.find({
            where: { user: { id: userId }, complete: true },
            relations: ['event', 'tickets']
        })
    }

    async createBooking(eventId: number, userId: number, ticketIds: number[]) {
        const dateNow = Date.now()
        const event = await this.eventsRepository.createQueryBuilder('event')
            .leftJoinAndSelect('event.tickets', 'ticket')
            .where('event.id = :eventId', { eventId })
            .andWhere('ticket.id IN (:...ticketIds)', { ticketIds })
            .andWhere('(ticket.complete = false AND ticket.reservationExpiry is NULL) OR (ticket.complete = false AND ticket.reservationExpiry < :currentTimestamp)', { currentTimestamp: dateNow })
            .getOne();
        if (!event || !event.tickets?.length) return { status: 'EVENT_UNAVAILABLE' }

        const queryRunner = this.bookingRepository.manager.connection.createQueryRunner()
        await queryRunner.startTransaction();
        try {
            const tickets = await queryRunner.manager
                .createQueryBuilder(Ticket, 'ticket')
                .where('ticket.id IN (:...ticketIds)', { ticketIds })
                .andWhere('ticket.complete = false')
                .andWhere('(ticket.reservationExpiry is NULL OR ticket.reservationExpiry < :currentTimestamp)', { currentTimestamp: dateNow })
                .setLock('pessimistic_write')
                .setOnLocked("skip_locked")
                .getMany()
            if (!tickets?.length) return { status: 'TICKETS_UNAVAILABLE' }

            const reservationExpiresAt = new Date().getTime() + FIFTEEN_MINUTES_MS;
            const booking = await queryRunner.manager.save(this.bookingRepository.create({
                event: { id: eventId },
                user: { id: userId },
                tickets: [],
                complete: false,
                expiresAt: reservationExpiresAt,
            }))

            for (const ticket of tickets) {
                ticket.booking = { id: booking.id } as Booking;
                ticket.reservationExpiry = reservationExpiresAt
            }
            await queryRunner.manager.save(tickets)
            await queryRunner.commitTransaction()

            return { status: 'SUCCESS', id: booking.id }
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }

    async confirmBooking(bookingId: string) {
        if (!bookingId) throw new Error('Invalid booking ID')
        const booking = await this.bookingRepository.findOneOrFail({ where: { id: bookingId }, relations: ['tickets'] })
        if (booking.complete) return
        if (booking.expiresAt < Date.now()) throw new Error('Booking expired')

        const queryRunner = this.bookingRepository.manager.connection.createQueryRunner()
        await queryRunner.startTransaction();
        try {
            const tickets = await queryRunner.manager.createQueryBuilder(Ticket, 'ticket')
                .where('ticket.id IN (:...ticketIds)', { ticketIds: booking.tickets.map(ticket => ticket.id) })
                .setLock('pessimistic_write')
                .setOnLocked('skip_locked')
                .getMany()

            for (const ticket of tickets) {
                ticket.complete = true
            }

            booking.complete = true
            await queryRunner.manager.save([...tickets, booking])
            await queryRunner.commitTransaction();
        } catch (error) {
            await queryRunner.rollbackTransaction()
            throw error
        } finally {
            await queryRunner.release()
        }
    }
}
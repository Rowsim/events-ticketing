import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { BookingsController } from "./bookings.controller";
import { bookingsProvider } from "./bookings.provider";
import { BookingsService } from "./bookings.service";

@Module({
    imports: [DatabaseModule],
    controllers: [BookingsController],
    providers: [...bookingsProvider, BookingsService],
})
export class BookingsModule { }
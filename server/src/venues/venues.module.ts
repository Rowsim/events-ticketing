import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { VenuesController } from "./venues.controller";
import { VenuesService } from "./venues.service";

@Module({
    imports: [DatabaseModule],
    controllers: [VenuesController],
    providers: [VenuesService],
})
export class VenuesModule { }
import { Controller, Get, InternalServerErrorException, Query } from "@nestjs/common";
import { SearchService } from "./search.service";

@Controller()
export class SearchController {
    constructor(private readonly searchService: SearchService) { }
    @Get("/search")
    async searchEvents(
        @Query('name') name?: string,
        @Query('fromDate') fromDate?: string,
        @Query('toDate') toDate?: string
    ) {
        try {
            return await this.searchService.searchEvents({ name, fromDate, toDate })
        } catch (e) {
            console.error(e)
            throw new InternalServerErrorException('Unexpected error');
        }
    }
}
import { Module } from "@nestjs/common";
import { SearchService } from "./search.service";
import { SearchController } from "./search.controller";
import { ElasticSearchModule } from "../elasticsearch/elasticsearch.module";

@Module({
    imports: [ElasticSearchModule],
    controllers: [SearchController],
    providers: [SearchService],
})
export class SearchModule {}
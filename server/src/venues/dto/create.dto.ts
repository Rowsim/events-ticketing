import { Venue } from "../../entity/Venue";

export class CreateVenueDto implements Omit<Venue, 'id' | 'event'> {
    name: string;
    location: string;
    imageUrl?: string;
}
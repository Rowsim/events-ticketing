import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PROVIDER_NAMES } from '../provider-constants';
import { User } from '../entity/User';

@Injectable()
export class UsersService {
    constructor(
        @Inject(PROVIDER_NAMES.USER_REPOSITORY) private userRepository: Repository<User>,
    ) { }

    async findByUsername(username: string) {
        return await this.userRepository.findOneBy({ username })
    }

    async createUser(username: string, password: string) {
        await this.userRepository.save(this.userRepository.create({
            username,
            password
        }))
    }
}

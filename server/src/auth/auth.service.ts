import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
const bcrypt = require('bcrypt')

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async signIn(username: string, password: string) {
        const user = await this.usersService.findByUsername(username)

        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!user?.password || !passwordMatch) {
            throw new UnauthorizedException()
        }

        const payload = { sub: user.id, username: user.username }
        return {
            access_token: await this.jwtService.signAsync(payload),
            username: user.username
        }
    }

    async createUser(username: string, password: string) {
        const hashedPassword = await bcrypt.hash(password, 10)
        await this.usersService.createUser(username, hashedPassword)
    }
}

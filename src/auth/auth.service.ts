// Commons
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';

// JWT
import { JwtService } from '@nestjs/jwt';

//Encryptions
import * as bcrypt from 'bcrypt'

// Dependencies
import { Account } from 'src/account/account.entity';
import { AccountService } from 'src/account/account.service';

// DTOs
import { AuthDTO, loginPayloadDTO } from './dto/auth.dto';

@Injectable()
export class AuthService {
    constructor (
        private readonly accountService:AccountService,
        private readonly jwtService:JwtService){}

    async validate(authPayload:AuthDTO):Promise<boolean | null>{

        const account = await this.accountService.getAccountByEmail(authPayload.email)

        // Search email in database
        if (!account) throw new NotFoundException('Email not found')

        // Check if account is activated
        if (account.isDeleted === true) throw new BadRequestException('Account inactivated')
        
        // Compare the password
        const hashed = await this.accountService.getHashedByEmail(authPayload.email)
        
        if (typeof hashed !== 'string') throw new BadRequestException('PasswordError: Expected String type')
        if (!bcrypt.compareSync(authPayload.password, hashed)) throw new UnauthorizedException('Password is wrong')
        
        return true
    }

    async jwt(payload:loginPayloadDTO){        
        return this.jwtService.sign(payload)
    }

    async verifyToken (token:string):Promise<boolean>{
        try {
            const payload = await this.jwtService.verifyAsync(token)
            return !!payload
        }
        catch(e){
            throw new UnauthorizedException('Token invalid')
        }
    }
}

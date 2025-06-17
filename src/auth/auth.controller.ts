// Commons
import { Body, Controller, Get, Post, Req, Res, UseGuards} from '@nestjs/common';
import { Response } from 'express';

// Dependencies
import { AccountService } from 'src/account/account.service';
import { AuthService } from './auth.service';

// Responses
import { errorResponse, successResponse, successWithDataResponse } from 'src/common/helpers/response.helper';

// DTOs
import { AuthDTO, loginPayloadDTO } from './dto/auth.dto';
import { ResponseDto } from 'src/common/dto/response.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor (private readonly authService:AuthService, private readonly accountService:AccountService){}

    @Post('login')
    // This controller return a token back from jwt module after authenticated
    async login(@Res({passthrough: true}) response:Response, @Body() authPayload:AuthDTO): Promise<ResponseDto<string | null>>{

        // Validate user's login information, validate() return the account if validated or null if not
        const validate = await this.authService.validate(authPayload)
        if (!validate) return errorResponse('validate', 400)

        const account = await this.accountService.getAccountByEmail(authPayload.email)
        if (!account) return errorResponse('AccountNotFound', 404)

        let loginPayload:loginPayloadDTO = {
            _id: account._id,
            email: account.email,
            role: account.role
        }

        const jwtToken = await this.authService.jwt(loginPayload)        

        // Set the cookie
        response.cookie('accessToken', jwtToken, {httpOnly: true})
        
        return successWithDataResponse(jwtToken, 'Login success', 200)

    }

    @Get('logout')
    logout(@Res({passthrough: true}) response:Response){
        response.clearCookie('accessToken')

        return successResponse('LogoutSuccess', 200)
    }

    @Get('test')
    @UseGuards(AuthGuard)
    test(){
        return 'yeeet'
    }
}

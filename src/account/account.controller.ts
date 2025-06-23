// Commons
import { Controller, Get, Post, Patch, Delete, Inject, Body, BadRequestException } from "@nestjs/common";
import { ObjectId } from "typeorm";

// Cache
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";

// Dependencies
import { AccountService } from "./account.service";
import { Account } from "./account.entity";

// Responses
import { ResponseDto } from "src/common/dto/response.dto";
import { errorResponse, successResponse, successWithDataResponse } from "src/common/helpers/response.helper";

// DTOs
import { AccountDTO } from "./DTOs/account.dto";

@Controller()
export class AccountController {
    constructor (private readonly accountService:AccountService, @Inject(CACHE_MANAGER) private readonly cache:Cache){}

    @Post('account')
    async createAccount(@Body() payload:AccountDTO): Promise<ResponseDto<AccountDTO | null > >{

        if (await this.accountService.getAccountByEmail(payload.email)) throw new BadRequestException('Invalid input: Email is used')

        try {
            this.accountService.createAccount(payload)
            // Remove hashed
            payload.hashed = ''

        }catch(error){
            throw new BadRequestException('Cannot create new account')
        }

        return successWithDataResponse(payload, 'Account created', 201)

    }

     @Get('accounts')
     async getAllAccounts(): Promise<ResponseDto<Account | null>>{

        const results = await this.accountService.getAllAccount()

        return results ? successWithDataResponse(results, 'Accounts fetched', 201) : errorResponse('Accounts not found', 404)
     }

     @Get('account')
     async getAccount(@Body() targetID:ObjectId):Promise<ResponseDto<Account | null>>{
        
        const targetAccount:Account | null = await this.accountService.getAccountByID(targetID)

        return targetAccount ? successWithDataResponse(targetAccount, "Account fetched", 201) : errorResponse('Account not found', 404)
     }

     @Patch('account/update')
     async updateAccount(@Body() payload:AccountDTO):Promise<ResponseDto<Account | null>> {
        
        const targetID:ObjectId = payload._id

        if (!targetID) throw new BadRequestException('ID cannot be empty')

        //Make sure the payload is not empty/falsy and the email is not used yet
        if (payload.email && await this.accountService.getAccountByEmail(payload.email)) throw new BadRequestException('Email is used')

        try{
            await this.accountService.updateAccount(payload)
            return successWithDataResponse(payload, 'Account updated', 204)
        }
        catch(e){
            throw new BadRequestException('Cannot update account')
        }

     }
     
     
     @Delete('account')
     async deleteAccount(@Body() targetID:ObjectId): Promise<ResponseDto<Account | null>> {

        if (!targetID) return errorResponse('ID is invalid', 401)

        try {
            this.accountService.deleteAccount(targetID)
            return successResponse('Account deleted', 204)
    }
        catch(e){
            throw new BadRequestException('Cannot delete account')
    }
    
}

     @Patch('account/restore')
     async restoreAccount (@Body() targetID:ObjectId): Promise<ResponseDto<Account | null >> {

        if (!targetID) return errorResponse('ID is invalid', 401)

        try {
            this.accountService.restoreAccount(targetID)
            return successResponse('Account restored', 201)
        }catch(e){
            throw new BadRequestException('Cannot restore account')
        }
}
        
}
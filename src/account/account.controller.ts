// Commons
import { Controller, Get, Post, Patch, Delete, Inject, Body, BadRequestException, ValidationPipe } from "@nestjs/common";
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
import { createAccountPipe } from "./account.pipe";

@Controller('account')
export class AccountController {
    constructor (private readonly accountService:AccountService, @Inject(CACHE_MANAGER) private readonly cache:Cache){}

    @Post('create')
    async createAccount(@Body(createAccountPipe) payload:AccountDTO): Promise<ResponseDto<AccountDTO | null > >{

        
        // Look up for the account with email and role
        // If any record fit both, email is determined as used
        const emailRef = await this.accountService.getAccountByEmail(payload.email)
        if ( emailRef && payload.role === emailRef.role)
            throw new BadRequestException('Email is used for this subsystem')

        try {
            this.accountService.createAccount(payload)
        }catch(error){
            throw new BadRequestException('Cannot create new account')
        }

        return successResponse('Account created', 201)

    }

     @Get('all')
     async getAllAccounts(): Promise<ResponseDto<Account | null>>{

        const results = await this.accountService.getAllAccount()

        return results ? successWithDataResponse(results, 'Accounts fetched', 201) : errorResponse('Accounts not found', 404)
     }

     @Get('')
     async getAccount(@Body() targetID:ObjectId):Promise<ResponseDto<Account | null>>{
        
        const targetAccount:Account | null = await this.accountService.getAccountByID(targetID)

        return targetAccount ? successWithDataResponse(targetAccount, "Account fetched", 201) : errorResponse('Account not found', 404)
     }

     @Patch('update')
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
     
     
     @Delete('')
     async deleteAccount(@Body() targetID:ObjectId): Promise<ResponseDto<Account | null>> {

        if (!targetID) throw new BadRequestException('ID is not valid')

        try {
            this.accountService.deleteAccount(targetID)
            return successResponse('Account deleted', 204)
    }
        catch(e){
            throw new BadRequestException('Cannot delete account')
    }
    
}

     @Patch('restore')
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
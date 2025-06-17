import { Account } from "src/account/account.entity"
import {IsBoolean, IsDate, IsString} from 'class-validator'

export class CreatePayloadDTO {

    @IsString()
    name: string

    @IsDate()
    birth: Date
    
    @IsString()
    address: string

    @IsString()
    phone: string

    @IsString()
    email: string

    @IsDate()
    joiningDate: Date

    @IsString()
    taxCode: string

    @IsBoolean()
    isDeleted: boolean

    @IsDate()
    lastUpdated: Date

    account: Account

}
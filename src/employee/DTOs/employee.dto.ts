import { Account } from "src/account/account.entity"
import {IsBoolean, IsDate, IsNotEmpty, IsString} from 'class-validator'
import { ObjectId } from "typeorm"

export class CreatePayloadDTO {

    _id: ObjectId

    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsDate()
    birth: Date
    
    @IsNotEmpty()
    @IsString()
    address: string

    @IsNotEmpty()
    @IsString()
    phone: string

    @IsNotEmpty()
    @IsString()
    email: string

    @IsNotEmpty()
    @IsDate()
    joiningDate: Date

    @IsNotEmpty()
    @IsString()
    taxCode: string

    isDeleted: boolean

    lastUpdated: Date

    @IsNotEmpty()
    account: string

}

export class updatePayloadDTO {
    _id: ObjectId

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

    isDeleted: boolean

    lastUpdated: Date
}
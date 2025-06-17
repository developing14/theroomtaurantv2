import { IsBoolean, IsDate, IsString } from "class-validator";
import { ObjectId } from "typeorm";

export class AccountDTO {

    _id: ObjectId

    @IsString()
    loginName: string

    @IsString()
    email: string

    @IsString()
    hashed: string

    @IsString()
    role:string

    @IsBoolean()
    isDeleted: boolean

    @IsDate()
    lastUpdated: Date
    
}
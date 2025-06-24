import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb'
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { Account } from './account.entity';


@Injectable()
export class AccountService {
    constructor (@InjectRepository(Account) private readonly AccountRepository:Repository<Account>) {}

    async createAccount(payload: Account): Promise<void> {
        payload.hashed = await this.hash(payload.hashed)

        this.AccountRepository.save(payload)
    }

    async getAllAccount ():Promise <Account [] | null>{
        const results = await this.AccountRepository.find()
        return results ? results : null
    }

    async getAccountByID(_id:ObjectId):Promise<Account | null >{
        const result = await this.AccountRepository
        .findOne({where: {_id: new ObjectId(_id)}})

        return result ? result : null
    }
    async getAccountByEmail(email: string): Promise<Account | null> {
        const result = await this.AccountRepository.findOne({where: {email}})
        return result ? result : null
    }

    async updateAccount(payload:Account): Promise<void> {
        let account = await this.getAccountByID(payload._id)
        
        if (account) {
            // Because the payload's ID is string type, while we need the id to be ObjectId, 
            // we change the ID of payload before merging it into account
            payload._id = account._id

            payload.lastUpdated = new Date()
            
            this.AccountRepository.merge(account, payload)

            this.AccountRepository.save(account)
        }
    }

    async deleteAccount(_id:ObjectId): Promise<void> {
        this.AccountRepository.update(
            {_id: new ObjectId(_id)},
            {
                isDeleted: true,
                lastUpdated: new Date()
            }
        )
    }

    async restoreAccount(_id:ObjectId): Promise<void> {
        await this.AccountRepository.update(
            {_id: new ObjectId(_id)},
            {
                isDeleted: false,
                lastUpdated: new Date()
            }
        )
    }

    async hash(raw:any): Promise<string> {

        const saltRounds: number = 10

        return bcrypt.hash(raw, saltRounds).then((result)=> {
            return result
    })}

     async getHashedByEmail(email:string): Promise<string | null> {

        const result = await this.AccountRepository.findOne({
            select: ['hashed'],
            where: {email:email}
        })
        
        return result ? result.hashed : null
    }

    compareHashed(password:string, hashed:string):Boolean{
        const result = bcrypt.compareSync(password, hashed)
        return result ? true : false
    }
}
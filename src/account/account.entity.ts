import { Entity, Column, ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'mongodb'

@Entity()
export class Account {
    // For default new instance (no parameter)
    constructor()

    // For new instance with parameters
    constructor(account: Account)
    constructor(account?: Account){
        if (account){
            this.email = account.email 
            this.loginName = account.loginName 
            this.hashed = account.hashed
            this.isDeleted = account.isDeleted ?? false
            this.role = account.role ?? "Guest"
            this.lastUpdated = new Date()
        }
    }
    
    @ObjectIdColumn()
    _id: ObjectId

    @Column()
    loginName: string

    @Column()
    hashed: string | Promise<string>

    @Column()
    email: string

    @Column()
    isDeleted: boolean 

    @Column()
    role: string

    @Column()
    lastUpdated: Date
}
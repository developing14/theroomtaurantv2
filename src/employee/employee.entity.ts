import { Column, Entity, JoinColumn, ObjectId, ObjectIdColumn, OneToOne } from "typeorm";
import { Account } from "src/account/account.entity";

@Entity()
export class Employee {

constructor(account:Account, employee:Employee)
constructor(account: Account, employee?:Employee){
    if (account && employee){
        this.name = employee.name
        this.birth = employee.birth
        this.address = employee.address
        this.phone = employee.phone
        this.email = account.email
        this.joiningDate = employee.joiningDate
        this.taxCode = employee.taxCode
        this.isDeleted = employee.isDeleted ?? false
        this.lastUpdated = new Date()
        this.account = account._id
    }
}

@ObjectIdColumn()
_id: ObjectId

@Column()
name: string

@Column()
birth: Date

@Column()
address: string

@Column()
phone: string

@Column()
email: string

@Column()
joiningDate: Date

@Column()
taxCode: string

@Column()
isDeleted: boolean

@Column()
lastUpdated: Date

@OneToOne(()=> Account)
@JoinColumn()
account: ObjectId

}
import { Column, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";

@Entity()
export class Department {
    // For default new instance
    constructor()

    // For new instance with parameters
    constructor(department:Department)
    constructor(department?:Department){
        if (department) {
            this.name = department.name
            this.salaryLevel = department.salaryLevel
        }
    }

    @ObjectIdColumn()
    _id: number

    @PrimaryColumn()
    ID:string

    @Column()
    name: string

    @Column()
    salaryLevel: number

    @Column()
    isDeleted: boolean

    @Column()
    lastUpdated: Date
    
}
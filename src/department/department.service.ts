import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import {v4 as uuid} from 'uuid'

import { Department } from "./department.entity";

@Injectable()
export class DepartmentService {
    constructor(@InjectRepository(Department) private readonly DepartmentRepository:Repository<Department>){}

    async createDepartment(department:Department) {
        this.DepartmentRepository.insert({
            ID: uuid(),
            name: department.name,
            salaryLevel: department.salaryLevel,
            isDeleted: false,
            lastUpdated: new Date()
        })
    }

    async getDepartmentByName(name:string):Promise<Department | null>{
        const result = await this.DepartmentRepository.findOne({where: {name: name}})
        return result ? result : null
    }

    async getAllDepartments(): Promise <Department[] | null > {
        const results = await this.DepartmentRepository.find()
        return results ? results : null
    }

    updateDepartment(department: Department): void {
        this.DepartmentRepository.update(
            {ID: department.ID},
            {
                name: department.name,
                salaryLevel: department.salaryLevel,
                lastUpdated: new Date()
            }
        )

    }

    deleteDepartment(department:Department):void{
        this.DepartmentRepository.update({ID: department.ID},{isDeleted:true})
    }

    restoreDepartment(department:Department):void {
        this.DepartmentRepository.update({ID: department.ID},{isDeleted:false})
    }
}
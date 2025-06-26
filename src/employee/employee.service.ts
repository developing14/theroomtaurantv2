import { BadRequestException, Injectable, ParseUUIDPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { Repository } from 'typeorm';

import { Employee } from './employee.entity';

@Injectable()
export class EmployeeService {
    constructor (@InjectRepository(Employee) private readonly EmployeeRepository:Repository<Employee>){}

    async createEmployee(accountAttached:any, payload:any){
        let employee = new Employee(accountAttached, payload)
        
        this.EmployeeRepository.save(employee)
    }
    
    async getAllEmployee():Promise<Employee [] | null >{
        const results = await this.EmployeeRepository.find()
        return results ? results : null
    }

    async getEmployeeByID(_id: ObjectId):Promise<Employee | null >{
        const result = await this.EmployeeRepository
        .findOne({where: {_id: new ObjectId(_id)}})

        return result ? result : null
        }
    
    async getEmployeeByEmail(email: string): Promise<Employee | null> {
            const result = await this.EmployeeRepository.findOne({where: {email}})
            return result ? result : null
        }
    
    async getEmployeeByName(name: string): Promise<Employee [] | null> {
            const results = await this.EmployeeRepository.find({where: {name}})
            return results ? results : null
        }
    
    async updateEmployee(payload:any): Promise<void> {
            let Employee = await this.getEmployeeByID(payload._id)
            
            if (Employee) {
                // Because the payload's ID is string type, while we need the id to be ObjectId, 
                // we change the ID of payload before merging it into Employee
                payload._id = Employee._id
    
                payload.lastUpdated = new Date()
                
                this.EmployeeRepository.merge(Employee, payload)
    
                this.EmployeeRepository.save(Employee)
            }
        }
    async deleteEmployee(_id:ObjectId): Promise<void> {
        this.EmployeeRepository.update(
            {_id: new ObjectId(_id)},
            {
                isDeleted: true,
                lastUpdated: new Date()
            }
        )
    }

    async restoreEmployee(_id:ObjectId): Promise<void> {
        await this.EmployeeRepository.update(
            {_id: new ObjectId(_id)},
            {
                isDeleted: false,
                lastUpdated: new Date()
            }
        )
    }

    async validate(payload:Employee): Promise<boolean>{
        if (!payload) throw new BadRequestException('PayloadNotFound')
        return true
    }

}

// Commons
import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Patch, Post, UseGuards, ValidationPipe} from '@nestjs/common';

// Dependencies
import { EmployeeService } from './employee.service';
import { AccountService } from 'src/account/account.service';
import { Employee } from './employee.entity';

// Responses
import { ResponseDto } from 'src/common/dto/response.dto';
import { errorResponse, successResponse, successWithDataResponse } from 'src/common/helpers/response.helper';
import { CreatePayloadDTO, updatePayloadDTO } from './DTOs/employee.dto';
import { IDPipe } from "src/common/pipe/common.pipe";
import { createPipe, updatePipe} from './employee.pipe';
import { ObjectId } from 'mongodb';
import { Account } from 'src/account/account.entity';

@Controller('employee')
export class EmployeeController {
    constructor (private readonly employeeService:EmployeeService, private readonly accountService:AccountService){}

    @Post('create')
    async createEmployee(@Body(createPipe) payload:CreatePayloadDTO ): Promise <ResponseDto<Employee | null>>{

        // Check if email is used
        if (await this.employeeService.getEmployeeByEmail(payload.email)) throw new BadRequestException('Invalid input: Email is already used')
        
        const targetID:string = payload.account
        
        const targetAccount:Account | null = await this.accountService.getAccountByID(new ObjectId(targetID))
        
        if (!targetAccount) throw new NotFoundException('Account not found')
        try {            
            payload.lastUpdated = new Date()
            await this.employeeService.createEmployee(targetAccount, payload) 
            return successResponse('Employee created', 201)
        }catch (e){
            throw new BadRequestException('Cannot create new employee')
        }
    }

    @Get('all')
    async getAllEmployee(): Promise <ResponseDto<Employee | null>>{
        const EMPs = await this.employeeService.getAllEmployee()
        return EMPs ? successWithDataResponse(EMPs, 'Get success', 200) : errorResponse('Cannot get employee', 400)
    }

    @Get()
    async getEmployee(@Body(IDPipe) targetID:ObjectId): Promise <ResponseDto<Employee | null>> {
        const targetEmployee: Employee  | null = await this.employeeService.getEmployeeByID(targetID)

        return targetEmployee ? successWithDataResponse(targetEmployee, "Success", 200) : errorResponse('Employee not found', 404)
    }

    @Patch()
    async updateEmployee(@Body(updatePipe) payload:updatePayloadDTO): Promise <ResponseDto<Employee | null>> {
        try {

            this.employeeService.updateEmployee(payload)
        }catch(e){
            throw new BadRequestException('Cannot update employee')
        }

        return successResponse('Success', 200)
    }

    @Delete()
    async deleteEmployee(@Body(IDPipe) targetID:ObjectId): Promise <ResponseDto <Employee | null>> {
        try{ 

            this.employeeService.deleteEmployee(targetID)
        }catch(e){
            throw new BadRequestException('Cannot delete employee')
        }
        
        return successResponse('Success', 200)
    }

    @Patch('restore')
    async restoreEmployee(@Body(IDPipe) targetID:ObjectId): Promise <ResponseDto <Employee | null>> {
        try{
            this.employeeService.restoreEmployee(targetID)
        }catch(e){
            throw new BadRequestException('Cannot restore employee')
        }
        return successResponse('Success', 200)

    }
}

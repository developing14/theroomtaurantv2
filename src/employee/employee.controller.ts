// Commons
import { BadRequestException, Body, Controller, Get, Post, UseGuards, ValidationPipe} from '@nestjs/common';

// Dependencies
import { EmployeeService } from './employee.service';
import { Employee } from './employee.entity';

// Responses
import { ResponseDto } from 'src/common/dto/response.dto';
import { successResponse, successWithDataResponse } from 'src/common/helpers/response.helper';
import { CreatePayloadDTO } from './DTOs/employee.dto';
import { createPipe } from './employee.pipe';

@Controller('employee')
export class EmployeeController {
    constructor (private readonly employeeService:EmployeeService){}

    @Post('create')
    async createEmployee(@Body(createPipe) payload:CreatePayloadDTO ): Promise <ResponseDto<Employee | null>>{

        // Check if email is used
        if (await this.employeeService.getEmployeeByEmail(payload.email)) throw new BadRequestException('Invalid input: Email is already used')
            
        try {
            await this.employeeService.createEmployee(payload)
            return successWithDataResponse(payload, 'Created', 201)
        }catch (e){
            throw e
        }
    }

    @Get('')
    async getAllEmployee(): Promise <ResponseDto<Employee | null>>{
        const EMPs = await this.employeeService.getAllEmployee()
        return successWithDataResponse(EMPs, 'Get success', 200)
    }
}

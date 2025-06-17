// Commons
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

// Dependencies
import { EmployeeService } from './employee.service';
import { Employee } from './employee.entity';

// Responses
import { ResponseDto } from 'src/common/dto/response.dto';
import { errorResponse, successResponse, successWithDataResponse } from 'src/common/helpers/response.helper';
import { EmployeeGuard } from './employee.guard';

@Controller('employee')
@UseGuards(EmployeeGuard)
export class EmployeeController {
    constructor (private readonly employeeService:EmployeeService){}

    @Post('create')
    async createEmployee(@Body() payload:Employee): Promise <ResponseDto<Employee | null>>{

        if (await this.employeeService.getEmployeeByEmail(payload.email)) return errorResponse('Email is used by another account', 400)
        
        try {
            await this.employeeService.createEmployee(payload)
            return successWithDataResponse(payload, 'Created', 201)
        }catch (e){
            return errorResponse('Cannot create', 400)
        }
    }
}

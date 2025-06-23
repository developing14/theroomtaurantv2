import { BadRequestException, Controller, Get, Post, Req } from "@nestjs/common";
import { Request } from "express";

import { DepartmentService } from "./department.service";
import { Department } from "./department.entity";
import { ResponseDto } from "src/common/dto/response.dto";
import { successResponse, successWithDataResponse } from "src/common/helpers/response.helper";

@Controller()
export class DepartmentController{
    constructor (private readonly departmentService:DepartmentService ){}
    @Post('department')
    async createDepartment(@Req() req:Request):Promise<ResponseDto<Department | null>>{
        const department = new Department(req.body.Department)

        try {
            await this.departmentService.createDepartment(department)
        }catch(e){
            throw new BadRequestException('Cannot create new Department')
        }

        return successWithDataResponse(department, 'Department created', 201)
    }

    @Get('department')
    async getDepartment(){}
}
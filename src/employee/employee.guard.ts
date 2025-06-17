import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class EmployeeGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean>  {
    const req = context.switchToHttp().getRequest()
    const payload = req.body.payload 
    
    const isAlphabetic = /^[A-Za-z]+$/
    const isAlphaNumeric = /^[A-Za-z0-9]+$/
    const isNumeric = /^[0-9]+$/

    if (
      !payload
      || !payload.name
      || !payload.birth
      || !payload.address
      || !payload.phone
      || !payload.email
      || !payload.joiningDate
      || !payload.taxCode
      || !payload.isDeleted
      || !payload.account
    ) throw new BadRequestException('Invalid input: Payload include/is empty')

    if (
      typeof(payload.name != 'string')
      || typeof(payload.birth != 'Date')
      || typeof(payload.address != 'string')
      || typeof(payload.phone != 'string')
      || typeof(payload.email != 'string')
      || typeof(payload.joiningDate != 'Date')
      || typeof(payload.taxCode != 'string')
      || typeof(payload.isDeleted != 'boolean')
      || typeof(payload.account != 'ObjectId')
    ) throw new BadRequestException('Invalid input: Invalid type of data')

    if (
      !isAlphabetic.test(payload.name)
      || !isAlphaNumeric.test(payload.address)
      || !isNumeric.test(payload.phone)
      || !isNumeric.test(payload.taxCode)
    ) throw new BadRequestException('Invalid input: Invalid character in string type data')
    
    return true
  }
}

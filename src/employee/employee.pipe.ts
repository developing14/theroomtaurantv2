import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class createPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const payload = value.payload
    
    if (!value.payload) throw new BadRequestException('Payload is not found')

    // Null checking
    if (
      !payload.name
      || !payload.birth
      || !payload.address
      || !payload.phone
      || !payload.email
      || !payload.joiningDate
      || !payload.taxCode
      || !payload.account
    ) throw new BadRequestException('Must-have field(s) cannot be empty')

    // Type checking for usual string type
    if (
      typeof(payload.name) != 'string'
      || typeof(payload.address) != 'string'
      || typeof(payload.email) != 'string'
      || typeof(payload.taxCode) != 'string'
    ) throw new BadRequestException('Field(s) have/has invalid type of data')

    // Type checking for Date type
    const birthConverted = new Date(payload.birth)
    const joiningDateConverted = new Date(payload.joiningDate)

    if (isNaN(birthConverted.getDate()) || isNaN(joiningDateConverted.getDate())) throw new BadRequestException('Field(s) have/has invalid type of data')

    // Ensure the isDeleted field is holding value include in value domain.
    if (payload.isDeleted !== 'False' && payload.isDeleted !== 'True') throw new BadRequestException('Field(s) have/has invalid type of data')
    
    return payload;
  }
}

@Injectable()
export class updatePipe {
  transform(value:any, metadata:ArgumentMetadata){
    const payload = value.payload
    
    if (!value.payload) throw new BadRequestException('Payload is not found')

    if (!payload._id) throw new BadRequestException('ID is missing')

    // Type checking for usual string type
    if (
      (payload.name && typeof(payload.name) != 'string')
      || ((payload.address) && typeof(payload.address) != 'string')
      || (payload.email && typeof(payload.email) != 'string')
      || (payload.taxCode && typeof(payload.taxCode) != 'string')
    ) throw new BadRequestException('Field(s) have/has invalid type of data #1')


    if (payload.birth){
      const birthConverted = new Date(payload.birth)
      if (birthConverted && isNaN(birthConverted.getDate()))
        throw new BadRequestException('Field(s) have/has invalid type of data #2')
    }
    if (payload.joiningDate){
    // Type checking for Date type
    const joiningDateConverted = new Date(payload.joiningDate)

    // Check type of birth and/or joiningDate if there are
      if (joiningDateConverted && isNaN(joiningDateConverted.getDate()))
      throw new BadRequestException('Field(s) have/has invalid type of data #2')
    }
    
    // Ensure the isDeleted field is holding value include in value domain if there is
    if (payload.isDeleted && payload.isDeleted !== 'False' && payload.isDeleted !== 'True') throw new BadRequestException('Field(s) have/has invalid type of data')
    
    return payload;
  }
}

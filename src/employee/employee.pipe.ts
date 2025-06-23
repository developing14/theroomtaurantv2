import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class createPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const payload = value.payload

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
    ) throw new BadRequestException('Invalid Input: Must-have field(s) cannot be empty')

    // Type checking for usual string type
    if (
      typeof(payload.name) != 'string'
      || typeof(payload.address) != 'string'
      || typeof(payload.email) != 'string'
      || typeof(payload.taxCode) != 'string'
    ) throw new BadRequestException('Invalid input: Field(s) have/has invalid type of data')

    // Type checking for Date type
    const birthConverted = new Date(payload.birth)
    const joiningDateConverted = new Date(payload.joiningDate)

    if (isNaN(birthConverted.getDate()) || isNaN(joiningDateConverted.getDate())) throw new BadRequestException('Invalid input: Field(s) have/has invalid type of data')

    // Ensure the isDeleted field is holding value include in value domain.
    if (payload.isDeleted !== 'False' && payload.isDeleted !== 'True') throw new BadRequestException('Invalid input: Field(s) have/has invalid type of data')
    
    return value;
  }
}

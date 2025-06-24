import { ArgumentMetadata, BadGatewayException, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

@Injectable()
export class createAccountPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const payload = value.payload

    if (!payload) throw new BadGatewayException('Payload is not found')
    
   if (
      !payload.loginName
      || !payload.email
      || !payload.hashed
      || !payload.role
    ) throw new BadGatewayException('Must-have field(s) cannot be empty')

    if (
      typeof(payload.loginName) !== 'string'
      || typeof(payload.email) !== 'string'
      || typeof(payload.hashed) !== 'string'
      || typeof(payload.role) !== 'string'
    ) throw new BadGatewayException('Field(s) have/has invalid type of data')


    return payload;
  }
}

import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class IDPipe implements PipeTransform {
   transform(value: any, metadata: ArgumentMetadata) {
    try{
      return value.targetID
    }catch(e){
      throw new BadRequestException("ID is missing")
    }
   }
}

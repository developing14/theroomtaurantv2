import { Entity } from "typeorm";

export class ResponseDto<entityType> {
  statusCode: number;
  message: string | any ; // String for custom message, any for Error object in try-catch scope
  data?: entityType | entityType [];

  // Use partial type for cases there ain't enough properties defined
  constructor(partial: Partial<ResponseDto<entityType>>) {
    Object.assign(this, partial);
  }
}

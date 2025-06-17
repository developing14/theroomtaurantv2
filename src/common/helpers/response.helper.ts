import { ResponseDto } from '../dto/response.dto';

export function successWithDataResponse<Entity>(
  data: Entity | Entity [],
  message = 'Success',
  statusCode = 200,
): ResponseDto<Entity> {
  return new ResponseDto<Entity>({ statusCode, message, data });
}

export function successResponse (
  message = 'Success',
  statusCode = 200
): ResponseDto<null> {
  return new ResponseDto<null>({message, statusCode, data: null})
}

export function errorResponse(
  message = 'Error occurred',
  statusCode = 400,
): ResponseDto<null> {
  return new ResponseDto<null>({ statusCode, message, data: null});
}

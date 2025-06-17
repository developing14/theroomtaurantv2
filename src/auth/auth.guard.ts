// Commons
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

// Dependencies
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor (private readonly authService:AuthService){}
  
  canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    

    // Check if token available
    const token = request.cookies?.accessToken
    if (!token)    
      throw new UnauthorizedException()

    return this.authService.verifyToken(token);
  }
}

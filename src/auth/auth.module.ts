// Commons
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

// Dependencies
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { Account } from 'src/account/account.entity';
import { AccountService } from 'src/account/account.service';

// JWT
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[
    TypeOrmModule.forFeature([Account]),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AccountService]
})
export class AuthModule {}

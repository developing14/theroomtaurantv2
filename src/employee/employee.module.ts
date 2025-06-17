import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { AccountService } from 'src/account/account.service';
import { Account } from 'src/account/account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, Account]),
            JwtModule.registerAsync({
              useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
              }),
        inject: [ConfigService],
      }),
],
  controllers: [EmployeeController],
  providers: [EmployeeService, AuthService, AccountService]
})
export class EmployeeModule {}

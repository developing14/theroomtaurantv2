import { Module } from '@nestjs/common';

// Database 
import { TypeOrmModule } from '@nestjs/typeorm';

// Process
import { CacheModule } from "@nestjs/cache-manager";

// Custom modules
import { AccountModule } from './account/account.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { EmployeeModule } from './employee/employee.module';

@Module({
  imports: [TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      username: '', 
      password: '', 
      database: 'TheRoomtaurantDB',
      autoLoadEntities: true,
    }), 
    AccountModule,
    AuthModule,
    CacheModule.register({isGlobal: true}),
    ConfigModule.forRoot({isGlobal: true}),
    EmployeeModule,
    ], 
})
export class AppModule {}

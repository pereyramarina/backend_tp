import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import {envs} from '../configuration'
import {JWTPassport} from './auth/jwt.passport'
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, AuthService, JWTPassport,PrismaService],
  imports: [JwtModule.register({
    
    secret: envs.secredKey,
    signOptions: { expiresIn: '24h' },
  }),
  PrismaModule
  ]  
})
export class UsersModule {}

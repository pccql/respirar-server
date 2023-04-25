import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { DashboardController } from './dashboard.controller';
import { UsersService } from 'src/users/users.service';
import { InterestsService } from 'src/interests/interests.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ActivitiesService } from 'src/activities/activities.service';

@Module({
  controllers: [DashboardController],
  providers: [
    UsersService,
    InterestsService,
    PrismaService,
    AuthService,
    JwtService,
    ConfigService,
    ActivitiesService,
  ],
})
export class DashboardModule {}

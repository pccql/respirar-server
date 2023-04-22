import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { DashboardController } from './dashboard.controller';
import { UsersService } from 'src/users/users.service';
import { InterestsService } from 'src/interests/interests.service';

@Module({
  controllers: [DashboardController],
  providers: [UsersService, InterestsService, PrismaService],
})
export class DashboardModule {}

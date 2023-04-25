import { Injectable } from '@nestjs/common';
import * as moment from 'moment-timezone';
import { PrismaService } from 'src/prisma.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

@Injectable()
export class ActivitiesService {
  constructor(private prisma: PrismaService) {}

  async create(createActivityDto: CreateActivityDto) {
    const today = moment().startOf('day');

    return await this.prisma.activity.create({
      data: {
        ...createActivityDto,
        day: today.toDate(),
      },
    });
  }

  async findAllByUser(user: number) {
    return await this.prisma.activity.findMany({ where: { user } });
  }

  async findCurrentByUser(user: number) {
    const today = moment().startOf('day');

    return await this.prisma.activity.findMany({
      where: { user, day: today.toDate() },
    });
  }

  async update(id: number, updateActivityDto: UpdateActivityDto) {
    return await this.prisma.activity.update({
      where: { id },
      data: updateActivityDto,
    });
  }
}

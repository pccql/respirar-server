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

  async getHistory(user: number) {
    // Group the activities by their chosen field, and count the number of occurrences
    const activityCounts = await this.prisma.activity.groupBy({
      by: ['completed'],
      _count: true,
      where: { user },
    });

    const topActivities = activityCounts
      .sort((a, b) => b._count - a._count)
      .slice(0, 3);

    // Map the top activities to the desired response format
    const response = topActivities.map(({ completed, _count }) => ({
      name: completed, // assuming there's only one option chosen for each activity
      amount: _count,
    }));

    return response;
  }
}

import { Injectable } from '@nestjs/common';
import { CreateInterestDto } from './dto/create-interest.dto';
import { UpdateInterestDto } from './dto/update-interest.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class InterestsService {
  constructor(private prisma: PrismaService) {}

  async create(createInterestDto: CreateInterestDto) {
    return await this.prisma.interest.create({
      data: createInterestDto,
    });
  }

  async findAll() {
    return await this.prisma.interest.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.interest.findUnique({ where: { id } });
  }

  async findByUser(user: number) {
    return await this.prisma.interest.findUnique({ where: { user } });
  }

  async update(id: number, updateInterestDto: UpdateInterestDto) {
    return await this.prisma.interest.update({
      where: { id },
      data: updateInterestDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.interest.delete({ where: { id } });
  }
}

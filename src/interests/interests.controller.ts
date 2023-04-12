import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InterestsService } from './interests.service';
import { CreateInterestDto } from './dto/create-interest.dto';
import { UpdateInterestDto } from './dto/update-interest.dto';

@Controller('interests')
export class InterestsController {
  constructor(private readonly interestsService: InterestsService) {}

  @Post()
  async create(@Body() createInterestDto: CreateInterestDto) {
    const user = await this.interestsService.findByUser(createInterestDto.user);

    if (user) {
      throw new HttpException(
        'User already has interest',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.interestsService.create(createInterestDto);
  }

  @Get()
  async findAll() {
    return await this.interestsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const interest = await this.interestsService.findOne(+id);

    if (!interest) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return this.interestsService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateInterestDto: UpdateInterestDto,
  ) {
    await this.findOne(id);

    return this.interestsService.update(+id, updateInterestDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.findOne(id);

    return this.interestsService.remove(+id);
  }
}

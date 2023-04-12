import { PartialType } from '@nestjs/mapped-types';
import { CreateInterestDto } from './create-interest.dto';
import { IsBoolean, IsArray } from 'class-validator';

export class UpdateInterestDto extends PartialType(CreateInterestDto) {
  @IsBoolean()
  movies: boolean;

  @IsBoolean()
  tv_shows: boolean;

  @IsBoolean()
  meditation: boolean;

  @IsBoolean()
  exercise: boolean;

  @IsArray()
  genres: string[];

  @IsArray()
  confort_shows: string[];
}

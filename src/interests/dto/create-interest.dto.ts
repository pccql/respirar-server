import { IsBoolean, IsNotEmpty, IsInt, IsArray } from 'class-validator';

export class CreateInterestDto {
  @IsNotEmpty()
  @IsInt()
  user: number;

  @IsNotEmpty()
  @IsBoolean()
  movies: boolean;

  @IsNotEmpty()
  @IsBoolean()
  tv_shows: boolean;

  @IsNotEmpty()
  @IsBoolean()
  meditation: boolean;

  @IsNotEmpty()
  @IsBoolean()
  exercise: boolean;

  @IsNotEmpty()
  @IsArray()
  genres: string[];

  @IsNotEmpty()
  @IsArray()
  confort_shows: string[];
}

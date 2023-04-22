import { IsBoolean, IsOptional, IsInt, IsArray } from 'class-validator';

export class CreateInterestDto {
  @IsInt()
  @IsOptional()
  user: number;

  @IsBoolean()
  @IsOptional()
  movies: boolean;

  @IsBoolean()
  @IsOptional()
  tv_shows: boolean;

  @IsBoolean()
  @IsOptional()
  meditation: boolean;

  @IsBoolean()
  @IsOptional()
  exercise: boolean;

  @IsArray()
  @IsOptional()
  genres: string[];

  @IsArray()
  @IsOptional()
  confort_shows: string[];
}

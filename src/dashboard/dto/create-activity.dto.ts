import { IsOptional, IsInt, IsEmail } from 'class-validator';

export class CreateActivityDto {
  @IsEmail()
  email: string;

  @IsOptional()
  @IsInt()
  humour?: number;
}

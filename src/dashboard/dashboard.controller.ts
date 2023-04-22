import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { InterestsService } from 'src/interests/interests.service';
import { UsersService } from 'src/users/users.service';

@Controller('dashboard')
export class DashboardController {
  constructor(
    private readonly usersService: UsersService,
    private readonly interestsService: InterestsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findOne(@Req() req) {
    const user = await this.usersService.findOne(req.user.id);

    const hasInterest = !!(await this.interestsService.findByUser(user));

    return { ...user, hasInterest };
  }
}

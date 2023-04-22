import { Controller, Get, Req, UseGuards, Headers } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { InterestsService } from 'src/interests/interests.service';
import { UsersService } from 'src/users/users.service';

@Controller('dashboard')
export class DashboardController {
  constructor(
    private readonly usersService: UsersService,
    private readonly interestsService: InterestsService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getData(@Req() req) {
    const user = await this.usersService.findOne(req.user.id);

    const hasInterest = !!(await this.interestsService.findByUser(user));

    return { ...user, hasInterest };
  }

  @Get('google-calendar')
  async getGoogleCalendarEvents(
    @Headers('Authorization') authorization: string,
  ) {
    const accessToken = authorization.split(' ')[1];
    const calendar = await this.authService.getGoogleCalendarService(
      accessToken,
    );
    const response = await calendar.events.list({ calendarId: 'primary' });
    return response.data.items;
  }
}

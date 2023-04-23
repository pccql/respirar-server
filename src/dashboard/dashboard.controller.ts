import {
  Controller,
  Get,
  Req,
  UseGuards,
  Headers,
  Body,
  Post,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { InterestsService } from 'src/interests/interests.service';
import { UsersService } from 'src/users/users.service';
import { getAvailableTimes } from 'src/utils/getAvailableTimes';
import { CreateActivityDto } from './dto/create-activity.dto';

@Controller('dashboard')
export class DashboardController {
  constructor(
    private readonly usersService: UsersService,
    private readonly interestsService: InterestsService,
    private readonly authService: AuthService,
  ) {}

  HUMOUR_MAPPING = { 1: 'triste', 2: 'neutro', 3: 'feliz' };

  @UseGuards(JwtAuthGuard)
  @Get()
  async getData(@Req() req) {
    const user = await this.usersService.findOne(req.user.id);

    const hasInterest = !!(await this.interestsService.findByUser(user));

    return { ...user, hasInterest };
  }

  @Post('activities')
  async getGoogleCalendarEvents(
    @Headers('Authorization') authorization: string,
    @Body() body: CreateActivityDto,
  ) {
    const accessToken = authorization.split(' ')[1];
    const calendar = await this.authService.getGoogleCalendarService(
      accessToken,
    );

    const availableTimes = await getAvailableTimes(calendar);

    const humour = body.humour || 2; // Default to 'neutro' humour if not specified
    const user = await this.usersService.findByEmail(body.email);
    const interests = await this.interestsService.findByUser(user);

    // Filter activities based on user interests
    const activities = [
      ...(interests.movies ? ['watch a movie'] : []),
      ...(interests.tv_shows ? ['watch a TV show'] : []),
      ...(interests.meditation ? ['meditate'] : []),
      ...(interests.exercise ? ['exercise'] : []),
      ...(interests.genres && interests.genres.length > 0
        ? interests.genres.map((genre) => `watch a ${genre} movie`)
        : []),
      ...(interests.confort_shows && interests.confort_shows.length > 0
        ? interests.confort_shows.map((show) => `watch ${show}`)
        : []),
    ];

    // Select a random available time slot for all activities
    const suggestedActivity =
      availableTimes.length > 0
        ? {
            time: availableTimes[
              Math.floor(Math.random() * availableTimes.length)
            ],
            activities: activities.slice(0, 2),
          }
        : { time: null, activities: [] };

    return suggestedActivity;
  }
}

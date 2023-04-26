import {
  Controller,
  Get,
  Req,
  UseGuards,
  Headers,
  Body,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ActivitiesService } from 'src/activities/activities.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { InterestsService } from 'src/interests/interests.service';
import { UsersService } from 'src/users/users.service';
import { chooseActivity } from 'src/utils/chooseActivity';
import { getAvailableTimes } from 'src/utils/getAvailableTimes';
import { CreateActivityDto } from './dto/create-activity.dto';

@Controller('dashboard')
export class DashboardController {
  constructor(
    private readonly usersService: UsersService,
    private readonly interestsService: InterestsService,
    private readonly authService: AuthService,
    private readonly activitiesService: ActivitiesService,
  ) {}

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
    try {
      const { email } = body;
      const user = await this.usersService.findByEmail(email);

      const accessToken = authorization.split(' ')[1];

      const calendar = accessToken
        ? await this.authService.getGoogleCalendarService(accessToken)
        : null;

      const availableTimes = await getAvailableTimes(calendar);

      const todaysActivity = await this.activitiesService.findCurrentByUser(
        user.id,
      );

      const history = await this.activitiesService.getHistory(user.id);

      if (todaysActivity.length > 0) {
        return { activities: todaysActivity[0], availableTimes, history };
      }

      const humour = body.humour || 2; // Default to 'neutro' humour if not specified
      const interests = await this.interestsService.findByUser(user);

      const chosenActivities = chooseActivity(interests, humour);

      const newActivity = await this.activitiesService.create({
        user: user.id,
        options: chosenActivities,
      });

      return { activities: newActivity, availableTimes, history };
    } catch (error) {
      console.log(error);
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }
}

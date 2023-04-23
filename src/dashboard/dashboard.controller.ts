import { Controller, Get, Req, UseGuards, Headers } from '@nestjs/common';
import * as moment from 'moment-timezone';
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

    // Get the timezone of the calendar
    const calendarResponse = await calendar.calendars.get({
      calendarId: 'primary',
    });
    const calendarTimezone = calendarResponse.data.timeZone;

    const startOfDay = moment().tz(calendarTimezone).startOf('day').hour(8);
    const endOfDay = moment().tz(calendarTimezone).startOf('day').hour(19);

    // Get events for the current day
    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: startOfDay.toISOString(true),
      timeMax: endOfDay.toISOString(true),
      timeZone: calendarTimezone,
    });

    const events = response.data.items;

    // Find available times
    const availableTimes = [];
    const duration = 30; // Desired duration in minutes

    for (let i = 0; i < events.length - 1; i++) {
      const eventEnd = moment(events[i].end.dateTime).tz(calendarTimezone);
      const nextEventStart = moment(events[i + 1].start.dateTime).tz(
        calendarTimezone,
      );

      const availableDuration = nextEventStart.diff(eventEnd, 'minutes');

      if (availableDuration >= duration) {
        availableTimes.push({
          start: eventEnd.format(),
          end: nextEventStart.format(),
        });
      }
    }

    return availableTimes;
  }
}

import { calendar_v3 } from 'googleapis';
import * as moment from 'moment-timezone';

export const getAvailableTimes = async (calendar: calendar_v3.Calendar) => {
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
  const minDuration = 30; // Desired duration in minutes

  for (let i = 0; i < events.length - 1; i++) {
    const eventEnd = moment(events[i].end.dateTime).tz(calendarTimezone);
    const nextEventStart = moment(events[i + 1].start.dateTime).tz(
      calendarTimezone,
    );

    const availableDuration = nextEventStart.diff(eventEnd, 'minutes');

    if (availableDuration >= minDuration) {
      availableTimes.push({
        start: eventEnd.format(),
        end: nextEventStart.format(),
      });
    }
  }

  return availableTimes;
};

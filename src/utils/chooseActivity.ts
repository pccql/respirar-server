import { Interest } from 'src/interests/entities/interest.entity';

type ActivityType = 'tv_show' | 'movie' | 'meditation' | 'walk' | 'exercise';

interface RandomElement {
  genres: string[];
  confort_shows: string[];
}

const addActivity = (activities: string[], activity: string): void => {
  if (!activities.includes(activity)) {
    activities.push(activity);
  }
};

function getRandomElement(element: string[]): string {
  return element[Math.floor(Math.random() * element.length)];
}

export const chooseActivity = (
  interests: Interest & RandomElement,
  humour: number,
): string[] => {
  const activities: string[] = [];

  if (humour === 1) {
    interests.tv_shows && addActivity(activities, 'tv_show');
    interests.meditation && addActivity(activities, 'meditation');
    activities.length === 0 && addActivity(activities, 'walk');
  } else if (humour === 2) {
    interests.movies && addActivity(activities, 'movie');
    interests.exercise && addActivity(activities, 'exercise');
    activities.length < 2 && addActivity(activities, 'meditation');
  } else if (humour === 3) {
    interests.exercise && addActivity(activities, 'exercise');
    interests.movies && addActivity(activities, 'movie');
    interests.meditation && addActivity(activities, 'meditation');
    activities.length < 3 && addActivity(activities, 'tv_show');
  }

  if (activities.includes('movie')) {
    const movieGenre = getRandomElement(interests.genres);
    activities[activities.indexOf('movie')] = 'movie,' + movieGenre;
  }

  if (activities.includes('tv_show')) {
    const tvShowConfortShow = getRandomElement(interests.genres);
    activities[activities.indexOf('tv_show')] = 'tv_show,' + tvShowConfortShow;
  }

  return activities.slice(0, 3);
};

import { Interest } from 'src/interests/entities/interest.entity';

export const chooseActivity = (
  interests: Interest,
  humour: number,
): string[] => {
  const activities = [];

  // Rank interests based on humour
  if (humour === 1) {
    if (interests.tv_shows) {
      activities.push('tv show');
    }
    if (interests.meditation) {
      activities.push('meditação');
    }
    if (activities.length === 0) {
      activities.push('caminhada');
    }
  } else if (humour === 2) {
    if (interests.movies) {
      activities.push('movie');
    }
    if (interests.exercise) {
      activities.push('exercício');
    }
    if (activities.length < 2) {
      activities.push('meditação');
    }
  } else if (humour === 3) {
    if (interests.exercise) {
      activities.push('exercício');
    }
    if (interests.movies) {
      activities.push('movie');
    }
    if (interests.meditation) {
      activities.push('meditação');
    }
    if (activities.length < 3) {
      activities.push('tv show');
    }
  }

  // If movies or tv shows are in the top 3, choose a genre or comfort show
  if (activities.includes('movie') && interests.genres.length > 0) {
    const randomIndex = Math.floor(Math.random() * interests.genres.length);
    activities[activities.indexOf('movie')] =
      'assistir filme de ' + interests.genres[randomIndex];
  }

  if (activities.includes('tv show') && interests.confort_shows.length > 0) {
    const randomIndex = Math.floor(
      Math.random() * interests.confort_shows.length,
    );
    activities[activities.indexOf('tv show')] =
      'assistir ' + interests.confort_shows[randomIndex];
  }

  // Return the top 3 ranked activities
  return activities.slice(0, 3);
};

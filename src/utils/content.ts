import { getCollection, type CollectionEntry } from 'astro:content';

export async function getEvents(
  filter?: (event: CollectionEntry<'events'>) => boolean,
  sortByRecent = true
): Promise<CollectionEntry<'events'>[]> {
  const events = await getCollection('events', filter);

  return events.sort((a, b) => {
    const dateA = a.data.end || a.data.start;
    const dateB = b.data.end || b.data.start;

    if (!dateA && !dateB) {
      return 0;
    }

    if (!dateA) {
      return 1;
    }

    if (!dateB) {
      return -1;
    }

    return sortByRecent
      ? new Date(dateB).getTime() - new Date(dateA).getTime()
      : new Date(dateA).getTime() - new Date(dateB).getTime();
  });
}

export async function getEventChallenges(
  filter?: (challenge: CollectionEntry<'challenges'>) => boolean
): Promise<CollectionEntry<'challenges'>[]> {
  return getCollection('challenges', filter);
}

export async function getEventYears(): Promise<string[]> {
  const events = await getCollection('events');
  const years = [
    ...new Set(events.map((event) => event.id.split('/')[0])),
  ].filter((year): year is string => typeof year === 'string');
  return years.sort((a, b) => b.localeCompare(a));
}

export async function getCategories(): Promise<string[]> {
  const challenges = await getCollection('challenges');
  const categories = new Set<string>();

  challenges.forEach((challenge) => {
    const challengeCategories = challenge.data.categories || [];
    challengeCategories.forEach((category) => {
      if (typeof category === 'string') {
        categories.add(category);
      }
    });
  });

  return [...categories].sort();
}

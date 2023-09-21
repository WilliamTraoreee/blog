import { DateTime } from 'luxon';

export const dateToHumanReadable = (date: string): string => {
	const d = new Date(date);
	return DateTime.fromJSDate(d).setLocale('fr').toFormat('d LLLL yyyy à HH:mm');
};

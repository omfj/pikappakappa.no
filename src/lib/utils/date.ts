import { format } from 'date-fns';
import nb from 'date-fns/locale/nb';

export const formatDate = (date: string | Date) => {
	const d = new Date(date);

	return format(d, 'MMMM d, yyyy', {
		locale: nb
	});
};

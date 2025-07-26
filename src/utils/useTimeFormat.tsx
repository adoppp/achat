import { format, isToday, isYesterday } from "date-fns";

export const formatRelativeTime = (seconds?: number): string => {
    console.log(seconds)
    if (!seconds) return '';

    const date = new Date(seconds * 1000);

    if (isToday(date)) {
        return format(date, 'HH:mm');
    }

    if (isYesterday(date)) {
        return 'yesterday';
    }

    return format(date, 'dd.MM.yyyy');
};
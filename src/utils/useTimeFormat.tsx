import { format, isToday, isYesterday } from "date-fns";

export const useTimeFormat = (seconds?: number): string => {
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
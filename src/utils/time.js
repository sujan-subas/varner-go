import { differenceInMinutes } from 'date-fns';

export function getFormattedDeadLine(timestamp) {
    const minutesLeft = differenceInMinutes(new Date(timestamp), new Date());
    const hours = Math.floor(minutesLeft / 60);
    const minutes = minutesLeft % 60;
    if (hours < 1) {
        return `${minutes} minutter`;
    } else {
        return `${hours} timer og ${minutes} minutter`;
    }
}
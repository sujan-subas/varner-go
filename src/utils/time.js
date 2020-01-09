import { differenceInMinutes } from 'date-fns';


export function getFormattedDeadLine(timestamp, now) {
    const minutesLeft = differenceInMinutes(new Date(timestamp), now);
    const hours = Math.floor(minutesLeft / 60);
    const minutes = minutesLeft % 60;
    if (hours < 1 && minutes < 1) {
        return '0';
    } else if (hours < 1) {
        return `${minutes} minutter`;
    } else {
        return `${hours} timer og ${minutes} minutter`;
    }
}
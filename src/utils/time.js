import { differenceInMinutes } from 'date-fns';

/*
export function getRemainingMinutes(timestamp) {
    const deadLine = new Date(timestamp);
    const now = new Date();
    const minutesLeft = differenceInMinutes(now, deadLine);

    return parseInt(minutesLeft);
}
*/

export function getFormattedDeadLine(timestamp) {
    const minutesLeft = differenceInMinutes(new Date(timestamp), new Date());
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
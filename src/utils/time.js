import { differenceInMinutes } from 'date-fns';


export function getFormattedDeadLine(timestamp1, timestamp2) {
    const minutesLeft = differenceInMinutes(timestamp1, timestamp2);
    const hours = Math.floor(minutesLeft / 60);
    const minutes = minutesLeft % 60;
    if (hours < 1 && minutes < 1) {
        return '0';
    } else if (hours < 1 && minutes === 1) {
        return `${minutes} minutt`;
    } else if (hours < 1) {
        return `${minutes} minutter`;
    } else {
        return `${hours} timer og ${minutes} minutter`;
    }
}

export function getTime() {
  let time;
  const { order } = this.state;
  if (order.status === 'new') {
      time = getFormattedDeadLine(
          new Date(order.deadLine), 
          new Date()
      )
  } else if (order.status === 'in-process') {
      time = getFormattedDeadLine(
          new Date(),
          new Date(order.acceptedTime)
      )
  }
  
  this.setState({
      time: time
  })
}
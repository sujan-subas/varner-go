// eksempel tidstempel
// const created_in_app_at = ("2020-01-17T00:50:01.001Z")
// legg til lørdag/søndag
export function setExpireValue(timestamp) {
  const openingTimeHour = 10;
  const time = new Date(timestamp);
  console.log(`timestamp: ${time}`);

  //get the weekday number
  const day = time.getDay();

  //get hours, minuts and sec
  const hours = time.getHours();

  // weekends must be accounted for.
  // - sunday closed for pick-up-in-store
  if (day === 7) {
    //next time day === 1
    // expire should be equal to 12.00.00 that day
    return "Sunday";
  }

  // - saturday closes 1 houre before weekdays
  if (time === 6) {
    //standard expire -1 hour
    return "Saturday";
  }

  //  general time left, store open and more than 2 hours to closing time
  Date.prototype.addDaysToTime = function(delayDays) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + delayDays);
    return date;
  };
  Date.prototype.addHoursToTime = function(expireTime) {
    this.setHours(this.getHours() + expireTime);
    return this;
  };

  //OBS! Pay attention to timezone differents. browser reads timestamp right.
  // expire value when order is placed between 17:00+ and 00:00
  if (hours >= 17 && hours < 24) {
    let nextWorkingDay = new Date(time).addDaysToTime(1);
    let newExpire = nextWorkingDay.setHours(10);
    let expires = new Date(newExpire);
    console.log(`Expires at: ${expires}`);
    return expires;
  }

  // expire value left when order is placed between 00:00 and 10:00
  if (hours < 10 && hours < openingTimeHour) {
    let newExpire = new Date().setHours("12,00,00");

    let expires = new Date(newExpire);
    console.log(`Expires at: ${expires}`);
    return expires;
  }

  // expire value when order is made between 10:00 and 17:00
  if (hours > openingTimeHour && hours < 17) {
    let expires = new Date(time).addHoursToTime(2);
    console.log(`Expires at: ${expires}`);
    return expires;
  }
}
// console.log(compareTime(created_in_app_at))
// setExpireValue(created_in_app_at);

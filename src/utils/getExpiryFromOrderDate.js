import { 
  getHours, 
  addHours, 
  addDays, 
  setHours, 
  setMinutes, 
  isSaturday, 
  isSunday, 
  isFriday,
  isThursday,
  isWednesday,
  isTuesday,
  isMonday
} from "date-fns";

// eksempel tidstempel
// const created_in_app_at = ("2020-01-17T00:50:01.001Z")
export function getExpiryFromOrderDate(timestamp) {
  let expireTime;

  const time = new Date(timestamp);
  const hourOfDay = getHours(time);
  const openingTime = 10;
  const closingTimeWeekday = 19;
  const closingTimeSaturday = 17;

  if (isSunday) {
    let newDay = addDays(time, 1);
    let setHoursOfDay = setHours(newDay, 12);
    let setMinutesOfDay = setMinutes(setHoursOfDay, 0);
    expireTime = setMinutesOfDay;
  } 
  
  if (isSaturday) {
    if (hourOfDay < openingTime) {
      let setHoursOfDay = setHours(time, 12);
      let setMinutesOfDay = setMinutes(setHoursOfDay, 0);
      expireTime = setMinutesOfDay;
    } else if (hourOfDay >= closingTimeSaturday) {
      let newDay = addDays(time, 2);
      let setHoursOfDay = setHours(newDay, 12);
      let setMinutesOfDay = setMinutes(setHoursOfDay, 0);
      expireTime = setMinutesOfDay;
    } else {
      expireTime = addHours(time, 2);
    }
  }

  if (isFriday || isThursday || isWednesday || isTuesday || isMonday) {
    if (hourOfDay < openingTime) {
      let setHoursOfDay = setHours(time, 12);
      let setMinutesOfDay = setMinutes(setHoursOfDay, 0);
      expireTime = setMinutesOfDay;
    } 
    else if (hourOfDay >= closingTimeWeekday) {
      let newDay = addDays(time, 1);
      let setHoursOfDay = setHours(newDay, 12);
      let setMinutesOfDay = setMinutes(setHoursOfDay, 0);
      expireTime = setMinutesOfDay;
    }
    else {
      expireTime = addHours(time, 2);
    }
  }

  return expireTime.toJSON();
}

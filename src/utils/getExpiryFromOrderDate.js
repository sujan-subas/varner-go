import { 
  isSaturday, 
  isSunday, 
  getHours, 
  addHours, 
  addDays, 
  setHours, 
  setMinutes 
} from "date-fns";

// eksempel tidstempel
// const created_in_app_at = ("2020-01-17T00:50:01.001Z")
export function getExpiryFromOrderDate(timestamp) {
  let expireTime;
  const time = new Date(timestamp);
  //const weekend = isWeekend(time); //returns true or false
  const hourOfDay = getHours(time);

  if (isSunday) {
    let newDay = addDays(time, 1);
    let setHoursOfDay = setHours(new Date(newDay), 12);
    let setMinutesOfDay = setMinutes(new Date(setHoursOfDay), 0);
    expireTime = setMinutesOfDay;
  } else if (isSaturday) {
    if (hourOfDay < 10) {
      let setHoursOfDay = setHours(new Date(time), 12);
      let setMinutesOfDay = setMinutes(new Date(setHoursOfDay), 0);
      expireTime = setMinutesOfDay;
    } else if (hourOfDay >= 15) {
      let newDay = addDays(time, 2);
      let setHoursOfDay = setHours(new Date(newDay), 12);
      let setMinutesOfDay = setMinutes(new Date(setHoursOfDay), 0);
      expireTime = setMinutesOfDay;
    } 
    else {
      expireTime = addHours(time, 2); //adds 2 hours from incoming timestamp
    }
  } else {
    if (hourOfDay < 10) {
      let setHoursOfDay = setHours(new Date(time), 12);
      let setMinutesOfDay = setMinutes(new Date(setHoursOfDay), 0);
      expireTime = setMinutesOfDay;
    } 
    else if (hourOfDay >= 17) {
      let newDay = addDays(time, 1);
      let setHoursOfDay = setHours(new Date(newDay), 12);
      let setMinutesOfDay = setMinutes(new Date(setHoursOfDay), 0);
      expireTime = setMinutesOfDay;
    }
    else {
      expireTime = addHours(time, 2); //adds 2 hours from incoming timestamp
    }
  }

  return expireTime.toJSON();
}

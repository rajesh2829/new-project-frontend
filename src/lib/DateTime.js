import moment from "moment";

import Cookies from "../lib/Helper";
import { COOKIE_TIME_ZONE } from "../lib/Cookie";

const currentDate = new Date(); // Get the current date
const currentYear = currentDate.getFullYear(); // Get the current year
const currentMonth = currentDate.getMonth();

class DateTime {

  // To avoid the TimeZone issue with toISOString()
  static toISOString(date) {
    return moment(date).format("YYYY-MM-DDT00:00:00.000") + "Z";
  }

  static toISOStringDate(date) {
    return moment(date).format("YYYY-MM-DD");
  }

  static toISOStrings(date) {
    return moment(date).format("YYYY-MM-DDT23:59:59.000") + "Z";
  }
  static formatDate(date) {
    return moment(date).format("YYYY-MM-DD");
  }
  static getDate(date) {
    if(date){
    return moment(date).format("DD-MMM-YYYY");
    }
    else{
      return null
    }
  }
  static currentDate() {
    return moment().format("YYYY-MM-DD");
  }

  static subtract(value) {
    if (value !== undefined) {
      const newDate = new Date();

      const weeklyDate = new Date(newDate.getTime() - value * 24 * 60 * 60 * 1000);

      const date = weeklyDate.toISOString().split('T')[0];

      return date;
    }
  }


  /**
 * convert UTC time to local time
 *
 * @param date
 * @returns {null|*}
 */
  static UTCtoLocalTime(date) {
    if (!date) {
      return null;
    }
    let gmtDateTime = moment.utc(date);

    return gmtDateTime.local().format("DD-MM-YY hh:mm A");
  }

  static LocalTime(date) {
    if (!date) {
      return null;
    }
    let gmtDateTime = moment.utc(date);

    return gmtDateTime.local().format("hh:mm A");
  }

  /**
   * convert UTC time to local time with seconds
   *
   * @param date
   * @returns {null|*}
   */
  static DateAndTime(date) {
    if (!date) {
      return null
    }
    let gmtDateTime = moment.utc(date);

    return gmtDateTime.local().format("DD-MM-YYYY hh:mm:ss A");
  }

  // Get DateTime Function
  static Get = (date) => {
    if (!date) {
      return null;
    }
    let gmtDateTime = moment.utc(date);

    return gmtDateTime.local().format("DD-MM-YYYY hh:mm:ss A");
  };

  // UTC To Local Time And Mmm Format
  static UTCtoLocalTimeAndMmmFormat(date) {
    if (!date) {
      return null;
    }
    let gmtDateTime = moment.utc(date);

    return gmtDateTime.local().format("DD-MMM-YY hh:mm A");
  }

  static getSchedulerTime() {
    let Interval = [];
    const IntervalInHour = [];
    const IntervalInMin = [
      { value: 1, label: "1 Min" },
      { value: 5, label: "5 Min" },
      { value: 15, label: "15 Min" },
      { value: 30, label: "30 Min" },
    ];
    for (let i = 1; i <= 24; i++) {
      IntervalInHour.push({
        value: 60 * i,
        label: `${i} Hour`,
      });
    }
    Interval = IntervalInMin.concat(IntervalInHour);

    return Interval;
  }

  static HoursAndMinutes(totalMinutes) {
    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);
    return `${hours} hr${hours > 1 ? "s" : ""} ${minutes} min${minutes > 1 ? "s" : ""
      }`;
  }

  static convertToISO(dateString) {
    // Split the date string by "/" to get an array of date components
    const dateComponents = dateString.split("/");

    // Get the current year and use it to create a full year string (e.g. "2021")
    const currentYear = new Date().getFullYear().toString();
    const fullYear = currentYear.slice(0, 2) + dateComponents[2];

    // Use the date components to create a new Date object
    const date = new Date(fullYear, dateComponents[1] - 1, dateComponents[0]);

    // Use the toISOString() method to get the ISO string representation of the date
    return date.toISOString();
  }

  static getToday() {
    return this.formatDate(this.getDateTimeByUserProfileTimezone(new Date()));
  }

  static TimeNow(date) {
    if (!date) {
      return null;
    }
    return moment(date).fromNow();
  }

  static currentMonthStartDate() {

    let currentDate = new Date(currentYear, currentMonth, 1)

    return this.formatDate(currentDate)
  }

  static getDateAndTime(inputDate) {
    if (inputDate) {
      const [date, time] = inputDate.split("T");
      if (time === '00:00:00.000Z') {
        return this.getDateTimeByUserProfileTimezone(date, "DD-MMM-YYYY");
      } else {
        return this.getDateTimeByUserProfileTimezone(inputDate);
      }
    } else {
      return null;
    }
  }

  static getTime(date) {

    const loginTime = new Date(date);
    const timeString = loginTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

    return timeString

  }

  static getTimeZones() {

    let timeZones = Intl.supportedValuesOf('timeZone')

    return timeZones
  }


  static getTimeZoneDateTime(dateTime, format) {

    let timeZone = Cookies.get(COOKIE_TIME_ZONE);

    if (dateTime && timeZone) {
      let dateValue = new Date(dateTime).toLocaleString("en-US", {
        timeZone: timeZone
      });

      return moment(dateValue).format(format)
    }
    return dateTime ? moment(dateTime).format(format) : ""
  }

  static getDateTimeByUserProfileTimezone(date, format = "DD-MMM-YY hh:mm A") {

    let dateTime = this.getTimeZoneDateTime(date, format)

    if (dateTime) {
      return dateTime;
    }

    return this.UTCtoLocalTimeAndMmmFormat(date);
  }

  static getDateByUserProfileTimezone(date, format = "YYYY-MM-DD") {

    let dateTime = this.getTimeZoneDateTime(date, format)

    if (dateTime) {
      return dateTime;
    }

    return this.UTCtoLocalTimeAndMmmFormat(date);
  }

  static getUserTimeZoneTime(time, format = "hh:mm A") {

    let convertedTime = this.getTimeZoneDateTime(time, format)

    if (convertedTime) {
      return convertedTime;
    }

    return time ? moment(time).format(format) : "";
  }

  static getTodayDateByUserTimeZone(date = new Date()) {

    let convertedDate = this.getTimeZoneDateTime(date, "YYYY-MM-DD")

    if (convertedDate) {
      return convertedDate;
    }

    return date
  }

  static getDateByUserProfileTimeZoneFrontEndFormat(date) {

    let convertedDate = this.getTimeZoneDateTime(date, "DD-MMM-YYYY")

    if (convertedDate) {
      return convertedDate;
    }

    return date
  }

  static timeToDateConversion(time) {

    if (time) {
      const dateObj = new Date();

      const timeObject = moment(time, "HH:mm:ss.SSS");

      dateObj.setHours(timeObject.get('hour'), timeObject.get('minute'));

      return dateObj;
    }

  }

}

export default DateTime;

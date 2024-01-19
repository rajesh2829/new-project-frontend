
import moment from "moment";

class Date {


  static joinDate(day, month, year) {

    let date = moment({ day: day, month: month - 1, year: year });

    let joinedDate = date.format('YYYY-MM-DD');

    return joinedDate;
  }

  static convertDateFormat(dateString) {
    let parts = dateString.split('/');
    let day = parseInt(parts[0], 10);
    let month = parseInt(parts[1], 10);
    let year = parseInt(parts[2], 10);

    if (year >= 0 && year < 100) {
      year += 2000;
    }

    let date = this.joinDate(day, month, year);

    return date;
  }

  static getDate(date) {
    return moment(date).format("YYYY-MM-DD");
  }
}

export default Date;

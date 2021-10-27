import moment from 'moment-timezone';
import { vn_Month, vn_DaysOfWeek } from './language/vn';
import { en_Month, en_DaysOfWeek } from './language/en';
import { jp_Month, jp_DaysOfWeek } from './language/jp';

const getConfigMonth = (lang) => {
  switch (lang) {
    case 'EN':
      return en_Month;
    case 'JP':
      return jp_Month;
    default:
      return vn_Month;
  }
};

const getAllDateInMonth = (date) => {
  const firstDayOfMonth = moment(date).startOf('month');
  const firstDayOfCal = firstDayOfMonth.clone().startOf('week');
  const lastDayOfMonth = firstDayOfMonth.clone().endOf('month');
  const lastDayOfCal = lastDayOfMonth.clone().endOf('week');
  const temp = firstDayOfCal.clone();
  const days = [temp.toDate()];
  while (temp.isBefore(lastDayOfCal) && days.length < 42) {
    temp.add(1, 'day');
    days.push(temp.toDate());
  }
  while (days.length < 42) {
    temp.add(1, 'day');
    days.push(temp.toDate());
  }
  return days;
};

const createClassName = (mCurrent, yCurrent, date) => {
  const month = Number(moment(date).format('MM'));
  const year = Number(moment(date).format('YYYY'));
  if (year !== yCurrent) {
    if (yCurrent > year) {
      return 'tdDateOld';
    } else {
      return 'tdDateNew';
    }
  } else {
    if (month < mCurrent) {
      return 'tdDateOld';
    } else if (month > mCurrent) {
      return 'tdDateNew';
    } else {
      return 'tdDate';
    }
  }
};

export const handleDate = (value) => {
  const format = 'YYYY-MM-DD HH:mm:ss';
  if (value) {
    return moment(new Date(value.replace(/-/g, '/'))).format(format);
  } else {
    return moment(new Date()).format(format);
  }
};

export const mergeFormat = (dateFormat, timeFormat) => {
  const nDateF = dateFormat ? dateFormat : '';
  const nTimeF = timeFormat && timeFormat !== 'false' ? timeFormat : '';
  const format = `${nDateF} ${nTimeF}`;
  return format.trim();
};

export const numTwoDigits = (num) => {
  const newNum = num < 10 ? `0${num}` : num;
  return newNum;
};
export const setSelectDate = (year, month, date, hours, mins, seconds) => {
  return new Date(year, month - 1, date, hours, mins, seconds);
};

export const deepClone = (obj) => {
  if (typeof obj === 'object') {
    return JSON.parse(JSON.stringify(obj));
  } else {
    return obj;
  }
};

export const getYear = (value) => {
  return moment(new Date(value.replace(/-/g, '/'))).format('YYYY');
};

export const parseYear = (year) => {
  return parseInt(year / 10, 10) * 10;
};

export const getListYear = (year) => {
  const start = parseYear(year) - 1;
  const tempYears = Array.from(new Array(12), (_, i) => Number(i) + Number(start));
  const listYears = [];
  let rowYears = [];
  tempYears.forEach((yearTemp, index) => {
    const newIndex = index + 1;
    const temp = yearTemp;
    rowYears.push(temp);
    if (newIndex % 4 === 0) {
      listYears.push(rowYears);
      rowYears = [];
    }
  });
  return listYears;
};

export const getMonth = (value) => {
  return moment(new Date(value.replace(/-/g, '/'))).format('MM');
};
export const getDate = (value) => {
  return moment(new Date(value.replace(/-/g, '/'))).format('DD');
};
export const getHours = (value) => {
  return moment(new Date(value.replace(/-/g, '/'))).hour();
};
export const getMins = (value) => {
  return moment(new Date(value.replace(/-/g, '/'))).minutes();
};
export const getSeconds = (value) => {
  return moment(new Date(value.replace(/-/g, '/'))).seconds();
};
export const getTime = (value, format) => {
  format = format && format.toLowerCase() !== 'false' ? format : 'HH:mm';
  return moment(new Date(value.replace(/-/g, '/'))).format(format);
};

export const getMonthFull = (value, lang) => {
  const listMonth = getConfigMonth(lang);
  const itemMonth = listMonth.filter((item) => item.id === Number(value));
  return itemMonth[0].value;
};

export const getCurrentDate = () => {
  const currentYear = Number(moment(new Date()).format('YYYY'));
  const currentMonth = Number(moment(new Date()).format('MM'));
  const currentDate = Number(moment(new Date()).format('DD'));
  return {
    currentYear,
    currentMonth,
    currentDate
  };
};

export const getShortMonth = (lang) => {
  const listMonth = deepClone(getConfigMonth(lang));
  const short = [];
  let rowShort = [];
  listMonth.forEach((item, index) => {
    const newIndex = Number(index) + 1;
    const temp = { id: item.id, short: item.short };
    rowShort.push(temp);
    if (newIndex % 4 === 0) {
      short.push(rowShort);
      rowShort = [];
    }
  });
  return short;
};

export const getDaysOfWeek = (lang) => {
  switch (lang) {
    case 'EN':
      return en_DaysOfWeek;
    case 'JP':
      return jp_DaysOfWeek;
    default:
      return vn_DaysOfWeek;
  }
};

export const getDaysCalendar = (date) => {
  const temp = getAllDateInMonth(date);
  const currentYear = Number(moment(date).format('YYYY'));
  const currentMonth = Number(moment(date).format('MM'));
  const arrDate = [];
  let dayOfWeek = [];
  temp.forEach((days, index) => {
    const newIndex = index + 1;
    const newYear = Number(moment(days).format('YYYY'));
    const newMonth = Number(moment(days).format('MM'));
    const day = Number(moment(days).format('DD'));
    const newClass = createClassName(currentMonth, currentYear, days);
    const item = { date: day, month: newMonth, year: newYear, className: newClass };
    dayOfWeek.push(item);
    if (newIndex % 7 === 0) {
      arrDate.push(dayOfWeek);
      dayOfWeek = [];
    }
  });
  return arrDate;
};
export const emitValue = (date) => {
  const format = 'YYYY-MM-DD HH:mm:ss';
  return moment(date).format(format);
};
export const showValue = (date, format) => {
  return moment(date).format(format);
};

export const detectMode = (mode) => {
  switch (mode) {
    case 'times':
      return 3;
    case 'years':
      return 2;
    case 'months':
      return 1;
    default:
      return 0;
  }
};

export default {
  deepClone,
  numTwoDigits,
  mergeFormat,
  handleDate,
  getYear,
  parseYear,
  getListYear,
  getMonth,
  getDate,
  getTime,
  getHours,
  getMins,
  getSeconds,
  getDaysCalendar,
  showValue,
  emitValue,
  getCurrentDate,
  detectMode,
  setSelectDate
};

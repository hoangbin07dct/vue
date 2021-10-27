<template>
  <div :class="stclassName">
    <div class="daysTile">
      <span class="daysTile__prev" @click="prevMonth">&lt;</span>
      <span class="daysTile__switch" @click="switchToMonth">{{ `${_getFullMonth} ${_getYear}` }}</span>
      <span class="daysTile__next" @click="nextMonth">&gt;</span>
    </div>
    <div class="days_inner">
      <table>
        <thead>
          <tr>
            <th class="days_th" v-for="(txtDay, index) in _getDaysOfWeek" :key="index">{{ txtDay }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in calendar" :key="index">
            <td
              v-for="(col, index) in row"
              :key="index"
              :class="`${getClassName(col.year, col.month, col.date)} ${col.className}`"
              @click="selectDate(col.year, col.month, col.date)"
            >
              {{ col.date }}
            </td>
          </tr>
        </tbody>
        <tfoot v-if="_showTime">
          <tr>
            <td colspan="7" class="time_td" @click="switchToTime">{{ _getTime }}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
import {
  handleDate,
  getMonthFull,
  getDaysOfWeek,
  getDaysCalendar,
  emitValue,
  getCurrentDate,
  getYear,
  getMonth,
  getDate,
  getHours,
  getMins,
  getSeconds,
  getTime
} from '../ProcessData.js';
export default {
  name: 'DaysView',
  props: {
    className: {
      type: String
    },
    value: {
      type: String,
      required: true
    },
    output: {
      type: String,
      required: true
    },
    language: {
      type: String
    },
    format: {
      type: String
    },
    timeFormat: {
      type: String
    }
  },
  data() {
    const valueCurrent = handleDate(this.value);
    return {
      stclassName: this.className ? `mrbPicker__days ${this.className}__days` : 'mrbPicker__days',
      stYear: Number(getYear(valueCurrent)),
      stMonth: Number(getMonth(valueCurrent)),
      stDate: Number(getDate(valueCurrent)),
      stHours: Number(getHours(valueCurrent)),
      stMins: Number(getMins(valueCurrent)),
      stSeconds: Number(getSeconds(valueCurrent)),
      stValue: this.value,
      stOutput: this.output !== '' ? this.output : false,
      stFormat: this.format,
      calendar: []
    };
  },
  methods: {
    getClassName(year, month, date) {
      const arrClass = ['days_td'];
      const valueCurrent = handleDate(this.value);
      const tempYear = Number(getYear(valueCurrent));
      const tempMonth = Number(getMonth(valueCurrent));
      const tempDate = Number(getDate(valueCurrent));
      const { currentYear, currentMonth, currentDate } = getCurrentDate();
      if (year === currentYear && month === currentMonth && date === currentDate) {
        arrClass.push('toDay');
      }
      if (tempYear === year && tempMonth === month && tempDate === date && this.stOutput) {
        arrClass.push('active');
      }
      return arrClass.join(' ');
    },
    daysOfMonth() {
      const date = new Date(this.stYear, this.stMonth - 1, 1);
      this.calendar = getDaysCalendar(date);
    },
    prevMonth() {
      if (this.stMonth === 1) {
        this.stMonth = 12;
        this.stYear = this.stYear - 1;
      } else {
        this.stMonth = this.stMonth - 1;
        this.stYear = this.stYear;
      }
      this.daysOfMonth();
    },
    nextMonth() {
      if (this.stMonth === 12) {
        this.stMonth = 1;
        this.stYear = this.stYear + 1;
      } else {
        this.stMonth = this.stMonth + 1;
        this.stYear = this.stYear;
      }
      this.daysOfMonth();
    },
    selectDate(year, month, date) {
      const slDate = new Date(year, month - 1, date, this.stHours, this.stMins, this.stSeconds);
      const newValue = emitValue(slDate);
      console.log(newValue);
      this.$emit('selectDate', newValue);
    },
    switchToMonth() {
      this.$emit('switchView', { year: this.stYear, month: this.stMonth, status: 1 });
    },
    switchToTime() {
      this.$emit('switchView', { year: this.stYear, month: this.stMonth, status: 3 });
    }
  },
  computed: {
    _getYear() {
      return this.stYear;
    },
    _getFullMonth() {
      return getMonthFull(this.stMonth, this.language);
    },
    _getDaysOfWeek() {
      return getDaysOfWeek(this.language);
    },
    _getTime() {
      return getTime(this.stValue, this.timeFormat);
    },
    _showTime() {
      if(!this.timeFormat) {
        return true;
      }
      else if (this.timeFormat === '' || this.timeFormat.toLowerCase() === 'false') {
        return false;
      } else {
        return true;
      }
    }
  },
  mounted() {
    this.daysOfMonth();
  }
};
</script>
<style lang="scss" scoped>
@import '../Styles/style.scss';
</style>

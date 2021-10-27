<template>
  <div :class="stclassName">
    <div class="timesTile" v-if="_modeView">
      <span class="timesTile__switch" @click="switchToDate">{{ _getDate }}</span>
    </div>
    <div class="times_inner">
      <div class="times_counter">
        <span class="times_btn" @click="setAscend(0)">▲</span>
        <span class="times_txt">{{ _getHours }}</span>
        <span class="times_btn" @click="setDecrease(0)">▼</span>
      </div>
      <div class="times_separator">:</div>
      <div class="times_counter">
        <span class="times_btn" @click="setAscend(1)">▲</span>
        <span class="times_txt">{{ _getMins }}</span>
        <span class="times_btn" @click="setDecrease(1)">▼</span>
      </div>
      <div class="times_counter" v-if="_showPeriods">
        <span class="times_btn">▲</span>
        <span class="times_txt">AM</span>
        <span class="times_btn">▼</span>
      </div>
    </div>
  </div>
</template>
<script>
import {
  showValue,
  getYear,
  getMonth,
  getDate,
  getHours,
  getMins,
  getSeconds,
  numTwoDigits,
  setSelectDate,
  emitValue 
} from '../ProcessData.js';
export default {
  name: 'TimesView',
  props: {
    className: {
      type: String
    },
    value: {
      type: String,
      required: true
    },
    format: {
      type: String
    },
    timeFormat: {
      type: String
    },
    onlyMode: {
      type: Boolean
    }
  },
  data() {
    return {
      stclassName: this.className ? `mrbPicker__times ${this.className}__times` : 'mrbPicker__times',
      stYear: Number(getYear(this.value)),
      stMonth: Number(getMonth(this.value)),
      stDate: Number(getDate(this.value)),
      stHours: Number(getHours(this.value)),
      stMins: Number(getMins(this.value)),
      stSeconds: Number(getSeconds(this.value)),
      stValue: this.value,
      stFormat: this.format,
      stTimeFormat: this.timeFormat
    };
  },
  methods: {
    switchToDate() {
      this.$emit('switchView', { year: this.stYear, month: this.stMonth, status: 0 });
    },
    setAscend(type) {
      let newHours, newMin;
      switch (type) {
        case 0:
          newHours = this.stHours + 1;
          newMin = this.stMins;
          break;
        case 1:
          newHours = this.stHours;
          newMin = this.stMins + 1;
          break;
        default:
          const format = timeFormat.toUpperCase();
          if (format.includes('A')) {
            console.log('aaaa');
          }
      }
      const slDate = setSelectDate(this.stYear, this.stMonth, this.stDate, newHours, newMin, this.stSeconds);
      const newValue = emitValue(slDate, this.stFormat);
      this.$emit('selectTime', newValue);
    },
    setDecrease(type) {
      let newHours, newMin;
      switch (type) {
        case 0:
          newHours = this.stHours - 1;
          newMin = this.stMins;
          break;
        case 1:
          newHours = this.stHours;
          newMin = this.stMins - 1;
          break;
        default:
          const format = timeFormat.toUpperCase();
          if (format.includes('A')) {
            console.log('aaaa');
          }
      }
      const slDate = setSelectDate(this.stYear, this.stMonth, this.stDate, newHours, newMin, this.stSeconds);
      const newValue = emitValue(slDate);
      this.$emit('selectTime', newValue);
    }
  },
  computed: {
    _getDate() {
      return showValue(this.value, this.format);
    },
    _getHours() {
      return numTwoDigits(this.stHours);
    },
    _getMins() {
      return numTwoDigits(this.stMins);
    },
    _modeView() {
      return !this.onlyMode;
    },
    _showPeriods() {
      return this.timeFormat
    }
  },
  watch: {
    value() {
      this.stYear = Number(getYear(this.value));
      this.stMonth = Number(getMonth(this.value));
      this.stDate = Number(getDate(this.value));
      this.stHours = Number(getHours(this.value));
      this.stMins = Number(getMins(this.value));
      this.stSeconds = Number(getSeconds(this.value));
      this.stValue = this.value;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../Styles/style.scss';
</style>

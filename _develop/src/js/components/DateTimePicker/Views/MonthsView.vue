<template>
  <div :class="stclassName">
    <div class="monthsTile" v-if="_modeView">
      <span class="monthsTile__prev" @click="prevYear">&lt;</span>
      <span class="monthsTile__switch" @click="switchToYear">{{ stYear }}</span>
      <span class="monthsTile__next" @click="nextYear">&gt;</span>
    </div>
    <div class="months_inner">
      <table>
        <tbody>
          <tr v-for="(row, index) in _listMonth" :key="index">
            <td v-for="(col, index) in row" :key="index" :class="getClassName(col.id)" @click="selectMonth(col.id)">
              {{ col.short }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import { handleDate, getShortMonth, getYear, getMonth, emitValue } from '../ProcessData.js';
export default {
  name: 'MonthsView',
  props: {
    className: {
      type: String
    },
    value: {
      type: String,
      required: true
    },
    language: {
      type: String
    },
    onlyMode: {
      type: Boolean
    }
  },
  data() {
    return {
      stclassName: this.className ? `mrbPicker__months ${this.className}__months` : 'mrbPicker__months',
      stYear: Number(getYear(this.value)),
      stMonth: Number(getMonth(this.value)),
      stValue: this.value
    };
  },
  methods: {
    getClassName(month) {
      const tempMonth = Number(getMonth(this.stValue));
      const tempYear = Number(getYear(this.stValue));
      if (month === tempMonth && this.stYear === tempYear) {
        return 'months_td active';
      } else {
        return 'months_td';
      }
    },
    prevYear() {
      this.stYear = this.stYear - 1;
    },
    nextYear() {
      this.stYear = this.stYear + 1;
    },
    selectMonth(month) {
      if (this.onlyMode) {
        const slDate = new Date(this.stYear, month - 1, 1);
        const newValue = emitValue(slDate, this.stFormat);
        this.$emit('selectDate', newValue);
      } else {
        this.$emit('switchView', { year: this.stYear, month: month, status: 0 });
      }
    },
    switchToYear() {
      this.$emit('switchView', { year: this.stYear, month: this.stMonth, status: 2 });
    }
  },
  computed: {
    _listMonth() {
      return getShortMonth(this.language);
    },
    _modeView() {
      return !this.onlyMode;
    }
  }
};
</script>
<style lang="scss" scoped>
@import '../Styles/style.scss';
</style>

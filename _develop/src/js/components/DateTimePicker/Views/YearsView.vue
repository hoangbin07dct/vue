<template>
  <div :class="stclassName">
    <div class="yearsTile">
      <span class="yearsTile__prev" @click="prevDecade">&lt;</span>
      <span class="yearsTile__switch">{{ `${_startYear} - ${_endYear}` }}</span>
      <span class="yearsTile__next" @click="nextDecade">&gt;</span>
    </div>
    <div class="years_inner">
      <table>
        <tbody>
          <tr v-for="(row, index) in _listYear" :key="index">
            <td v-for="(col, index) in row" :key="index" :class="getClassName(col)" @click="selectYear(col)">
              {{ col }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import { handleDate, getYear, parseYear, getListYear, emitValue } from '../ProcessData.js';
export default {
  name: 'YearsView',
  props: {
    className: {
      type: String
    },
    value: {
      type: String,
      required: true
    },
    onlyMode: {
      type: Boolean
    }
  },
  data() {
    return {
      stclassName: this.className ? `mrbPicker__years ${this.className}__years` : 'mrbPicker__years',
      stYear: Number(getYear(this.value)),
      stValue: this.value
    };
  },
  methods: {
    getClassName(year) {
      const tempYear = Number(getYear(this.stValue));
      if (year === tempYear) {
        return 'years_td active';
      } else {
        return 'years_td';
      }
    },
    prevDecade() {
      this.stYear = this.stYear - 10;
    },
    nextDecade() {
      this.stYear = this.stYear + 10;
    },
    selectYear(year) {
      if (this.onlyMode) {
        const slDate = new Date(year, 1, 1);
        const newValue = emitValue(slDate, this.stFormat);
        this.$emit('selectDate', newValue);
      } else {
        this.$emit('switchView', { year: year, month: 1, status: 1 });
      }
    }
  },
  computed: {
    _startYear() {
      return parseYear(this.stYear) - 1;
    },
    _endYear() {
      return parseYear(this.stYear) + 10;
    },
    _listYear() {
      return getListYear(this.stYear);
    }
  }
};
</script>
<style lang="scss" scoped>
@import '../Styles/style.scss';
</style>

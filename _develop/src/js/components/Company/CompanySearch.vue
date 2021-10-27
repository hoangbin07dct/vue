<template>
  <div class="search">
    <div class="item_col">
      <label for="company_name">会社名</label>
      <input v-model="search.companyName" id="company_name" class="input__inner" placeholder="例）有限会社カテル・ド・ベトナム" />
    </div>
    <div class="item_col">
      <label for="company_valid">ステータス</label>

      <CustomSelect :options="options" :defaultValue="defaultValue" class="select" @input="input($event)" />
    </div>
    <div class="group-btn">
      <Button type="primary" className="btn-search" label="検索" icon="icon_search" @click="handleSearch" />
      <Button type="cancel" className="btn-search" label="クリア" icon="icon_reset" @click="resetSearch" />
    </div>
  </div>
</template>

<script>
import CustomSelect from '../Select/Index.vue';
import { deepClone } from '../../utils/helpers';
import Button from '../Button/Index.vue';
export default {
  name: 'CompanySearch',
  components: {
    Button,
    CustomSelect
  },

  data() {
    return {
      search: {
        companyName: null,
        company_valid: ''
      },
      defaultValue: -1,
      options: [
        { name: 'すべて', value: -1 },
        { name: '有効', value: 0 },
        { name: '無効', value: 1 }
      ],
      selectInput: true
    };
  },
  mounted() {
    this.getDefaultValue();
    if (localStorage.getItem('company')) {
      try {
        this.search = JSON.parse(localStorage.getItem('company'));
      } catch (error) {
        localStorage.removeItem('company');
      }
    }
  },

  methods: {
    getDefaultValue() {
      const optionValue = localStorage.getItem('company') ? JSON.parse(localStorage.getItem('company')).company_valid : -1;
      this.defaultValue = optionValue;
    },
    handleSearch() {
      const parsed = JSON.stringify(this.search);
      localStorage.setItem('company', parsed);
      this.$emit('handleSearch');
    },
    resetSearch() {
      this.search.companyName = null;
      this.search.company_valid = '';
      localStorage.removeItem('company');
      this.$emit('resetSearch');
      this.defaultValue = -1;
    },

    input(e) {
     
      this.defaultValue = e;
      this.search.company_valid = e;
    }
  },
  destroyed() {
    localStorage.removeItem('company');
  }
};
</script>

<style lang="scss" scoped>
@import '../../../sass/Search.module';
</style>
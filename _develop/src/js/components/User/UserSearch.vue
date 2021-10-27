<template>
  <div class="search">
    <div class="item_col">
      <label for="user_name">氏名</label>
      <input v-model="search.userName" id="user_name" class="input__inner" placeholder="例）山田 太郎" />
    </div>
    <div class="item_col">
      <label for="company_id">会社名</label>
      <CustomSelect
        :options="optionsCompany"
        :defaultValue="defaultValueCompany"
        class="select"
        :selectInput="selectInput"
        @input="changeSelectCompany($event)"
      />
    </div>
    <div class="item_col">
      <label for="user_role">権限</label>
      <CustomSelect
        :options="optionsRole"
        :defaultValue="defaultValueRole"
        class="select"
        @input="changeSelectRole($event)"
      />
    </div>
    <div class="item_col">
      <label for="user_valid">ステータス</label> 
      <CustomSelect
        :options="options"
        :defaultValue="defaultValue"
        class="select"
        @input="changeSelect($event)"
      />
    </div>
    <div class="group-btn">
      <Button type="primary" className="btn-search" label="検索" icon="icon_search" @click="handleSearch" />
      <Button type="cancel" className="btn-search" label="クリア" icon="icon_reset" @click="resetSearch" />
    </div>
  </div>
</template>

<script>
import { deepClone } from '../../utils/helpers';
import CustomSelect from '../Select/Index.vue';
import Button from '../Button/Index.vue';
export default {
  name: 'UserSearch',
  components: {
    Button,
    CustomSelect
  },
  props: {
    companyAll: {
      type: Array
    }
  },
  data() {
    return {
      search: {
        userName: '',
        companyId: '',
        user_valid: '',
        selectedRole: '',
      },
      userRole: [],
      options: [
        { name: 'すべて', value: -1 },
        { name: '有効', value: 1 },
        { name: '無効', value: 0 }
      ],
      optionsRole: [
        { name: 'すべて', value: -1 }
      ],
      optionsCompany: [],
      defaultValue: -1,
      defaultValueRole: -1,
      defaultValueCompany: -1,
      selectInput: true
    };
  },
  mounted() {
    if (localStorage.getItem('users')) {
      try {
        this.search = JSON.parse(localStorage.getItem('users'));
      } catch (error) {
        localStorage.removeItem('users');
      }
    }
    this.optionsRole = [...this.optionsRole, ...this.$store.getters['list/role']];
  },
  watch: {
    '$store.state.list.role'() {
      this.optionsRole = [...this.optionsRole, ...this.$store.getters['list/role']];
      this.getDefaultValue();
    },
    companyAll() {
      const companyTemp = deepClone(this.companyAll);
      companyTemp?.map((item) => this.optionsCompany.push({
        name: item.company_name,
        value: item.company_id
      }));
      this.getDefaultValue();
    }
  },
  destroyed() {
    localStorage.removeItem('users');
  },
  methods: {
    getDefaultValue() {
      const optionValue = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')).user_valid : -1;
      const optionValueRole = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')).selectedRole : -1;
      const optionValueCompany = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')).companyId : -1;
      this.defaultValue = optionValue;
      this.defaultValueRole = optionValueRole;
      this.defaultValueCompany = optionValueCompany;
    },
    handleSearch() {
      const parsed = JSON.stringify(this.search);
      localStorage.setItem('users', parsed);
      const pathName = this.$route.path;
      this.$store.dispatch('setting/handlePaging', { numberPaging: 1, pathPaging: pathName });
      this.$emit('handleSearch');
    },
    resetSearch() {
      this.search.userName = '';
      this.search.companyId = '';
      this.search.selectedRole = '';
      this.search.user_valid = '';
      localStorage.removeItem('users');
      this.defaultValue = -1;
      this.defaultValueRole = -1;
      this.defaultValueCompany = -1;
      this.$emit('resetSearch');
    },
    changeSelect(e) {
      this.defaultValue = e;
      this.search.user_valid = e;
    },
    changeSelectRole(e) {
      this.defaultValueRole = e;
      this.search.selectedRole = e;
    },
    changeSelectCompany(e) {
      this.defaultValueCompany = e;
      this.search.companyId = e;
    }
  }
};
</script>

<style lang="scss" scoped>
  @import '../../../sass/Search.module';
  ::placeholder {
    font-size: 14px;
  }
</style>

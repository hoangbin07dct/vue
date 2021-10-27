<template>
  <div class="page__content">
    <form class="form">
      <div class="groupBtn">
        <Button label="戻る" type="cancel" :link="{ name: 'User' }" icon="icon_arrow_left" />
        <Button label="登録" type="primary" @click="addUser" v-if="!this.$route.params.id" icon="icon_new" />
        <Button label="更新" type="primary" @click="editUser" v-if="this.$route.params.id" icon="icon_edit" />
      </div>
      <div class="form-item-group">
        <div class="form-item form-item--required">
          <label class="form-label">ログインID</label>
          <div class="form-item__content">
            <p v-if="this.$route.params.id">{{ users.user_id }}</p>
            <input
              type="text"
              name="user_id"
              maxlength="255"
              class="input__inner"
              autocomplete="off"
              placeholder="例）E******"
              v-model="users.user_id"
              v-if="!this.$route.params.id"
            />
            <span class="form-item__error">{{ isError('user_id') }}</span>
          </div>
        </div>
        <div class="form-item form-item--required">
          <label class="form-label">氏名</label>
          <div class="form-item__content">
            <div class="input">
              <input
                type="text"
                name="user_name"
                maxlength="255"
                class="input__inner"
                autocomplete="off"
                placeholder="例）山田 太郎"
                v-model="users.user_name"
              />
              <span class="form-item__error">{{ isError('user_name') }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="form-item-group">
        <div class="form-item form-item--required">
          <label class="form-label">パスワード</label>
          <div class="form-item__content">
            <div class="input">
              <input
                type="password"
                name="user_password"
                maxlength="255"
                class="input__inner"
                autocomplete="off"
                placeholder="パスワード"
                v-model="users.user_password"
              />
              <span class="form-item__error">{{ isError('user_password') }}</span>
            </div>
          </div>
        </div>
        <div class="form-item form-item--required">
          <label class="form-label">メールアドレス</label>
          <div class="form-item__content">
            <div class="input">
              <input
                type="text"
                name="user_email"
                maxlength="255"
                class="input__inner"
                autocomplete="off"
                placeholder="例）taro.yamada@example.com"
                v-model="users.user_email"
              />
              <span class="form-item__error">{{ isError('user_email') }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="form-item-group">
        <div class="form-item form-item--required">
          <label class="form-label">権限</label>
          <div class="form-item__content">
            <CustomSelect
              :options="[
                { name: '選択して下さい', value: '-1' },
                ...roleList
              ]"
              :defaultValue="defaultValueRole"
              class="select"
              @input="changeSelectRole($event)"
            />
            <!-- <div class="form-select">
              <select name="user_role" v-model="users.user_role">
                <option value="-1">選択して下さい</option>
                <option v-for="role in roleList" :key="role.value" :value="role.value">
                  {{ role.name }}
                </option>
              </select>
            </div> -->
            <span class="form-item__error">{{ isError('user_role') }}</span>
          </div>
        </div>
        <div class="form-item">
          <label class="form-label">会社名</label>
          <div class="form-item__content">
            <CustomSelect
              :options="[
                ...newCompanyList
              ]"
              :defaultValue="defaultValueCompany"
              :selectInput="selectInput"
              class="select"
              @input="changeSelectCompany($event)"
            />
            <!-- <div class="form-select">
              <select name="company_name" v-model="users.company_id">
                <option value="-1">選択して下さい</option>
                <option v-for="company in companyList" :key="company.company_id" :value="company.company_id">
                  {{ company.company_name }}
                </option>
              </select>
            </div> -->
            <span class="form-item__error">{{ isError('company_name') }}</span>
          </div>
        </div>
      </div>
      <div class="form-item-group" v-if="isStatus">
        <div class="form-item">
          <label class="form-label">ステータス</label>
          <div class="form-item__content">
            <label class="Switch">
              <input type="checkbox" class="SwitchInput" v-model="users.user_valid" />
              <span class="SliderRound" />
            </label>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { getListCompany } from '../../utils/api-path';
import { getRequest } from '../../utils/api-request';
import Button from '../../components/Button/Index.vue';
import CustomSelect from '../../components/Select/Index.vue';
export default {
  name: 'UserForm',
  components: {
    Button,
    CustomSelect
  },
  props: {
    users: {
      type: Object
    },
    error: {
      type: Object
    },
    message: {
      type: String
    }
  },
  data: () => {
    return {
      companyList: [],
      roleList: [],
      loading: false,
      isDisabled: false,
      selectInput: true,
      defaultValueCompany: -1,
      defaultValueRole: -1
    };
  },
  mounted() {
    this.roleList = this.$store.getters['list/role'];
    this.getCompanyData();
  },
  computed: {
    isStatus() {
      return this.users.is_change_valid || this.$route.name === 'UserNew';
    },
    newCompanyList() {
      const newData = this.companyList.map(item => {
        return {name: item.company_name, value: item.company_id}
      });
      return newData;
    },
  },
  watch: {
    '$store.state.list.role'() {
      this.roleList = this.$store.getters['list/role'];
    },
    users: {
      immediate: true,
      handler() {
        this.getDefaultValue();
      },
      deep: true
    }
  },
  methods: {
    getDefaultValue() {
      this.defaultValueCompany = this.users.company_id;
      this.defaultValueRole = this.users.user_role;
    },
    getCompanyData() {
      this.loading = true;
      const url = `${getListCompany}`;
      const token = this.$store.state.auth.info.access_token;
      getRequest(url, token).then((res) => {
        const { data } = res.result;
        this.companyList = data;
        this.loading = false;
      });
    },
    isError(name) {
      return this.error && this.error[name] && this.error[name][0];
    },
    editUser() {
      this.$emit('edit', this.users);
    },
    addUser() {
      this.$emit('add', this.users);
    },
    changeSelectCompany(e) {
      this.users.company_id = e;
    },
    changeSelectRole(e) {
      this.users.user_role = e;
    }
  }
};
</script>
<template>
  <div class="PageWrapper user">
    <div class="pageInner">
      <Title title="ユーザー一覧" />
      <div class="groupBtn">
        <Button label="新規登録" type="primary" :link="{ name: 'UserNew' }" icon="icon_new" />
      </div>
      <Search :companyAll="companyAll" @handleSearch="handleSearch" @resetSearch="resetSearch" />
      <template v-if="pagination.totalPage > 0">
        <p class="paginationText">{{ getPaginationText }}</p>
      </template>
      <Table :message="message" :users="users" :titles="titles" :startNumber="pagination.numberStart" @changeStatus="changeStatus" @handleDelete="handleDelete" />
      <template v-if="pagination.totalPage > 1">
        <Pagination :pagination="pagination" @handleChangePage="handleChangePage" />
      </template>
    </div>
  </div>
</template>

<script>
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { getListUsers, switchValidUser, deleteUser, getListCompany } from '../../utils/api-path';
import { getRequest, updateRequest, deleteRequest } from '../../utils/api-request';
import Search from '../../components/User/UserSearch.vue';
import Table from '../../components/User/Table.vue';
import Button from '../../components/Button/Index.vue';
import Pagination from '../../components/Pagination/Index.vue';
import Title from '../../components/Title/Index.vue';
export default {
  name: 'User',
  components: {
    Search,
    Title,
    Table,
    Button,
    Pagination
  },
  data() {
    return {
      users: [],
      titles: ['No', 'ステータス', 'ログインID', '氏名', 'メール', '会社名', '権限', '操作'],
      pagination: {
        currentPage: 1,
        totalPage: 1,
        totalRecord: 1,
        pageSize: 1,
        numberStart: 0
      },
      companyAll: [],
      message: '',
      token: '',
      loading: false
    };
  },
  created() {
    gsap.registerPlugin(ScrollToPlugin);
    this.token = this.$store.getters['auth/info'].access_token;
    const userRole = this.$store.getters['auth/info'].user_role;
    if (userRole === 2) {
      this.titles = ['No', 'ログインID', '氏名', 'メール', '会社名', '権限']
    }
  },
  mounted() {
    const users_paging = JSON.parse(localStorage.getItem('setting_paging'));
    const currentPage = users_paging ? users_paging.numberPaging : this.pagination.currentPage;
    this.fetch(currentPage);
    this.getCompanyAll();
  },
  destroyed() {
    this.$store.dispatch('setting/handleReset');
  },
  watch: {
    pagination() {
      this.handleScrollTop();
    }
  },
  computed: {
    getPaginationText() {
      const currentPage = this.pagination.currentPage;
      const totalPage = this.pagination.totalPage;
      const totalRecord = this.pagination.totalRecord;
      const start = this.pagination.numberStart;
      const end = this.pagination.numberStart + this.pagination.pageSize - 1;
      return `${totalRecord}件中 ${start}～${end}件表示 （${currentPage}/${totalPage}ページ）`;
    }
  },
  methods: {
    handleScrollTop() {
      gsap.to(window, { duration: 0.2, scrollTo: 0 });
    },
    fetch(currentPage = 1) {
      this.loading = true;
      const limit = 15;
      let newCurrentPage = currentPage === 0 ? 1 : currentPage;
      newCurrentPage = isNaN(newCurrentPage) ? 1 : newCurrentPage;
      let search = null;
      let query = '';
      if (localStorage.getItem('users')) {
        try {
          search = JSON.parse(localStorage.getItem('users'));
        } catch (error) {
          localStorage.removeItem('users');
        }
      }
      if (search) {
        const searchName = search.userName !== '' ? `&user_name=${search.userName}` : '';
        const searchCompany = search.companyId !== '' && search.companyId !== -1 ? `&company_id=${search.companyId}` : '';
        const searchRole = search.selectedRole !== '' && search.selectedRole !== -1 ? `&user_role=${search.selectedRole}` : '';
        const searchValid = search.user_valid !== '' && search.user_valid !== -1 ? `&user_valid=${search.user_valid}` : '';
        query = `${searchName}${searchCompany}${searchRole}${searchValid}`;
      }
      const url = `${getListUsers}?limit=${limit}&current_page=${newCurrentPage}${query}`;
      // const token = this.$store.getters['auth/info'].access_token;
      getRequest(url, this.token).then((res) => {
        const { data, total_page, total_record, current_page, page_size, message } = res.result;
        this.pagination = {
          currentPage: Number(current_page),
          totalPage: total_page,
          totalRecord: total_record,
          pageSize: page_size,
          numberStart: Number(current_page) * Number(limit) - Number(limit) + 1
        };
        this.users = data;
        this.message = message;
        this.loading = false;
      });
    },
    async getCompanyAll() {
      try {
        // const token = this.$store.getters['auth/info'].access_token;
        const { result } = await getRequest(getListCompany, this.token);
        this.companyAll = result.data;
      } catch (error) {
        console.log(error);
      }
    },
    handleChangePage(page) {
      this.fetch(page);
    },
    changeStatus({ value, id }) {
      const url = `${switchValidUser}/${id}`;
      const token = this.$store.state.auth.info.access_token;
      const findItem = this.users.find((user) => user.user_id === id);
      findItem.user_valid = value;
      try {
        updateRequest(url, token);
      } catch (error) {
        console.log(error);
      }
    },
    handleDelete(id) {
      const url = `${deleteUser}/${id}`;
      const token = this.$store.state.auth.info.access_token;
      deleteRequest(url, token).then((rs) => {
        if (rs.status === 200) {
          this.fetch(1);
        }
      });
    },
    handleSearch() {
      this.fetch();
    },
    resetSearch() {
      this.fetch();
    }
  }
};
</script>

<style lang="scss">
@import '../../../sass/Common.module';
@import '../../../sass/Wrapper.module';
@import '../../../sass/User.module';
.user {
  @media screen and (max-width: 1300px) {
    .search {
      .item_col {
        label {
          width: rem(50);
        }
      }
    }
  }
}
</style>

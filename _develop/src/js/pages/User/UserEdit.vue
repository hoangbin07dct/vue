<template>
  <div class="PageWrapper user userEdit">
    <div class="pageInner">
      <Title title="ユーザー編集" />
      <Form :users="users" :error="error" @edit="handleEdit" />
    </div>
    <Modal :message="message" @confirm="cancleModal" v-if="message" />
  </div>
</template>

<script>
import { getUser, updateUser } from '../../utils/api-path';
import { getRequest, updateRequest } from '../../utils/api-request';
import Form from './UserForm.vue';
import Title from '../../components/Title/Index.vue';
import Modal from '../../components/Modal/Modal.vue';
export default {
  name: 'UserEdit',
  components: {
    Title,
    Form,
    Modal
  },
  data: () => {
    return {
      users: {},
      loading: false,
      error: {},
      message: ''
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.loading = true;
      const url = `${getUser}/${this.$route.params.id}`;
      const token = this.$store.state.auth.info.access_token;
      getRequest(url, token).then((res) => {
        const { data } = res.result;
        if (res.status === 200) {
          this.users = data;
          this.loading = false;
        }
      });
    },
    handleEdit(e) {
      let data = null;
      if (e.user_password) {
        data = {
          user_password: e.user_password,
          user_name: e.user_name,
          user_email: e.user_email,
          user_role: e.user_role,
          user_valid: e.user_valid ? 1 : 0,
          company_id: e.company_id
        };
      } else {
        data = {
          user_name: e.user_name,
          user_email: e.user_email,
          user_role: e.user_role,
          user_valid: e.user_valid ? 1 : 0,
          company_id: e.company_id
        };
      }
      const url = `${updateUser}/${this.$route.params.id}`;
      const token = this.$store.state.auth.info.access_token;
      updateRequest(url, token, data).then((res) => {
        const { status_code, message, error } = res.result;
        if (status_code === 200) {
          this.$router.push({ name: 'User' });
        } else {
          this.error = error;
          this.message = message;
        }
      });
    },
    cancleModal() {
      this.message = "";
    }
  }
};
</script>
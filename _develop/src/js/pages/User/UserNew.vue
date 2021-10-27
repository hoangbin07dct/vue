<template>
  <div class="PageWrapper user userNew">
    <div class="pageInner">
      <Title title="ユーザー登録" />
      <Form :users="users" :error="error" @add="handleNew" />
    </div>
    <Modal :message="message" @confirm="cancleModal" v-if="message" />
  </div>
</template>

<script>
  import { createUser } from '../../utils/api-path';
  import { createRequest } from '../../utils/api-request';
  import Form from './UserForm.vue';
  import Title from '../../components/Title/Index.vue';
  import Modal from '../../components/Modal/Modal.vue';
  export default {
    name: 'UserNew',
    components: {
      Title,
      Form,
      Modal
    },
    data: () => {
      return {
        users: {
          user_id: '',
          user_password: '',
          user_name: '',
          user_email: '',
          user_role: -1,
          user_valid: 1,
          company_id: -1
        },
        error: {},
        message: ''
      };
    },
    methods: {
      handleNew(e) {
        const data = {
          user_id: e.user_id,
          user_password: e.user_password,
          user_name: e.user_name,
          user_email: e.user_email,
          user_role: e.user_role,
          user_valid: e.user_valid ? 1 : 0,
          company_id: e.company_id,
        };
        const url = `${createUser}`;
        const token = this.$store.state.auth.info.access_token;
        createRequest(url, token, JSON.stringify(data)).then((res) => {
          const { status_code, message, error } = res.result;
          if (status_code === 201) {
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
  }
</script>
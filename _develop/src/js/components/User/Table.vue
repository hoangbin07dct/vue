<template>
  <div class="Table" :class="{member: !isMember}">
    <table>
      <thead>
        <tr>
          <th v-for="(title, index) in titles" :key="index">{{ title }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="item.id">
          <td>{{ index + startNumber }}</td>
          <td v-if="isMember">
            <label class="Switch" v-if="item.is_change_valid">
              <input type="checkbox" class="SwitchInput" v-model="item.user_valid" @change="changeStatus(item.user_valid, item.user_id)" />
              <span class="SliderRound" />
            </label>
          </td>
          <td>{{ item.user_id }}</td>
          <td>{{ item.user_name }}</td>
          <td>{{ item.user_email }}</td>
          <td>{{ item.company_name }}</td>
          <td>{{ item.user_role_name }}</td>
          <td v-if="isMember">
            <div class="group-btn">
              <template>
                <Button
                  v-if="item.is_edit"
                  :link="{ name: 'UserEdit', params: { id: item.user_id } }"
                  type="primary"
                  label="編集"
                  icon="icon_edit"
                />
                <Button v-else type="disable" label="編集" icon="icon_edit" />
              </template>
              <template>
                <Button v-if="item.is_delete" type="danger" label="削除" @click="handleDelete(item.user_id)" icon="icon_delete" />
                <Button v-else type="disable" label="削除" icon="icon_delete" />
              </template>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-if="items.length === 0" class="text-message">{{ message }}</p>
  </div>
</template>

<script>
import { deepClone } from '../../utils/helpers';
import Button from '../Button/Index.vue';
export default {
  name: 'Table',
  components: {
    Button
  },
  props: {
    users: {
      type: Array
    },
    titles: {
      type: Array
    },
    message: {
      type: String
    },
    startNumber: {
      type: Number
    }
  },
  data() {
    return {
      items: [],
      userRole: '',
    };
  },
  created() {
    this.userRole = this.$store.getters['auth/info'].user_role;
  },
  computed: {
    isMember() {
      return this.userRole !== 2;
    }
  },
  watch: {
    users() {
      this.items = deepClone(this.users);
    }
  },
  methods: {
    changeStatus(value, id) {
      this.$emit('changeStatus', { value, id });
    },
    handleDelete(id) {
      this.$emit('handleDelete', id);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../../sass/Common.module';
.text-message {
  text-align: center;
  margin-top: 20px;
}
</style>

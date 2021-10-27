<template>
  <div class="Table">
    <table>
      <thead>
        <tr>
          <th v-for="(title, index) in titles" :key="index">{{ title }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(company, index) in companies" :key="company.id">
          <td>{{ index + 1 }}</td>
          <td>
            <label class="Switch" v-if="company.is_change_valid">
              <input type="checkbox" class="SwitchInput" v-model="company.company_valid" @change="changeStatus(company.company_id)" />
              <span class="SliderRound" />
            </label>
          </td>
          <td>{{ company.company_id }}</td>
          <td>{{ company.company_name }}</td>
          <td>{{ company.company_email }}</td>
          <td>{{ company.total_member }}</td>
          <td>
            <div class="group-btn">
              <template>
                <Button
                  v-if="company.is_edit"
                  :link="{ name: 'CompanyEdit', params: { id: company.company_id } }"
                  type="primary"
                  label="編集"
                  icon="icon_edit"
                />
                <Button v-else type="disable" label="編集" icon="icon_edit" />
              </template>
              <template>
                <Button v-if="company.is_delete" type="danger" label="削除"  @click="confirmDelete(company.company_id)" />
                <Button v-else type="disable" label="削除" icon="icon_delete" />
              </template>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Button from '../Button/Index.vue';
export default {
  name: 'Table',
  components: {
    Button
  },
  props: {
    companies: {
      type: Array
    },
    titles: {
      type: Array
    }
  },

  data: function () {
    return {
      // items: this.items
      // titles: this.titles
    };
  },
  methods: {
    changeStatus(company_id) {
      this.$emit('changeStatus', company_id);
    },
    confirmDelete(company_id) {
      this.$emit('confirmDelete', company_id);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../../sass/Common.module';
</style>

<template>
  <ul class="Pagination">
    <li v-on:click="changCurrentPage(1)" :class="setDisable(1)">
      <a>
        <i class="glyphs-icon_prev"></i>
      </a>
    </li>
    <li v-on:click="changCurrentPage(currentPage - 1)" :class="setDisable(1)">
      <a>
        <i class="glyphs-icon_arrow_left"></i>
      </a>
    </li>
    <li v-for="(page, index) in arrayPage" :key="index" :class="setActive(page)" @click="changCurrentPage(page)">
      <a>{{ page }}</a>
    </li>
    <li @click="changCurrentPage(currentPage + 1)" :class="setDisable(totalPage)">
      <a>
        <i class="glyphs-icon_arrow_right"></i>
      </a>
    </li>
    <li @click="changCurrentPage(totalPage)" :class="setDisable(totalPage)">
      <a>
        <i class="glyphs-icon_next"></i>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    pagination: {
      type: Object,
      required: true
    }
  },
  data() {
    const { currentPage, totalPage, totalRecord, pageSize } = this.pagination;
    return {
      arrayPage: this.getListPage(currentPage, totalPage),
      currentPage: currentPage,
      totalPage: totalPage,
      totalRecord: totalRecord,
      pageSize: pageSize
    };
  },
  methods: {
    getListPage(current, total) {
      if (total <= 5) {
        return this.createArrayNumber(1, total);
      } else if (current < 3) {
        if (total > 5) {
          return this.createArrayNumber(1, 5);
        } else {
          return this.createArrayNumber(1, total);
        }
      } else if (current > total - 2) {
        return this.createArrayNumber(total - 4, total);
      } else {
        return this.createArrayNumber(current - 2, current + 2);
      }
    },
    createArrayNumber(from, to) {
      const arr = [];
      for (let i = from; i <= to; i++) {
        arr.push(i);
      }
      return arr;
    },
    changCurrentPage(page) {
      if (page < 1 || page > this.totalPage) return;
      // localStorage.setItem('users_paging', page);
      const pathName = this.$route.path;
      this.$store.dispatch('setting/handlePaging', { numberPaging: page, pathPaging: pathName });
      this.$emit('handleChangePage', page);
    },
    setActive(page) {
      const active = this.currentPage === page ? 'active' : '';
      return active;
    },
    setDisable(page) {
      const disabled = this.currentPage === page ? 'disabled' : '';
      return disabled;
    }
  },
  watch: {
    pagination() {
      const { currentPage, totalPage, totalRecord, pageSize } = this.pagination;
      this.arrayPage = this.getListPage(currentPage, totalPage);
      this.currentPage = currentPage;
      this.totalPage = totalPage;
      this.totalRecord = totalRecord;
      this.pageSize = pageSize;
    }
  }
};
</script>
<style lang="scss" scoped>
@import '../../../sass/Pagination.module';
</style>

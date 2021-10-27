<template id="modal">
  <div class="modal">
    <div class="modal-window">
      <p>{{message}}</p>
      <div class="actions">
        <button class="submit" @click="onConfirm">OK</button>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'Modal',
  props: {
    message: {
      type: String
    }
  },
  methods: {
    onConfirm() {
      this.$emit('confirm');
    },
  }
};
</script>

<style lang="scss" scoped>
@import '../../../sass/ModalConfirm.module';
</style>
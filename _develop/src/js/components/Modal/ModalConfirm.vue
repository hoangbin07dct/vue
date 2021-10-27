<template id="modalConfirm">
  <div class="modal">
    <div class="modal-window">
      <p>削除してもよろしいですか？</p>
      <div class="actions">
        <button class="cancel" @click="onCancel">CANCEL</button>
        <button class="confirm" @click="onConfirm">OK</button>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'ModalConfirm',
  props: ['open'],
  methods: {
    onConfirm() {
      this.$emit('confirm');
    },
    onCancel() {
      this.$emit('cancel');
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../../sass/ModalConfirm.module';
</style>

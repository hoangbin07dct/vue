<template>
  <i :class="`btn__icon glyphs-${typeIcon}`"></i>
</template>

<script>
export default {
  name: 'Icon',
  props: {
    typeIcon: {
      type: String,
      required: true
    }
  }
};
</script>

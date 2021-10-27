<template>
  <div class="custom-select" :tabindex="tabindex" v-click-outside="hideSelect">
    <template v-if="!selectInput">
      <div class="selected" :class="{ open: open }" @click="open = !open">
        {{ selected }}
      </div>
      <div class="items" :class="{ selectHide: !open }">
        <div
          v-for="(option, i) of options"
          :key="i"
          @click="
            selected = option.name;
            open = false;
            $emit('input', option.value);
          "
          :class="selected === option.name ? 'active' : ''"
        >
          {{ option.name }}
        </div>
      </div>
    </template>

    <template v-if="selectInput">
      <div class="input">
        <input type="text" :class="{ open: open }" v-model="selected" @focus="open = true" @input="input" />
      </div>

      <div class="items" :class="{ selectHide: !open }" v-if="optionsNew[0].value !== -2">
        <div
          v-for="(option, i) of optionsNew"
          :key="i"
          @click="
            selected = option.name;
            open = false;
            $emit('input', option.value);
          "
          :class="selected === option.name ? 'active' : ''"
        >
          {{ option.name }}
        </div>
      </div>
      <div class="items" :class="{ selectHide: !open }" v-if="optionsNew[0].value === -2">
        <div v-for="(option, i) of optionsNew" :key="i" :disabled="true" :class="'disabled'">
          {{ option.name }}
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside';
export default {
  props: {
    options: {
      type: Array,
      required: true
    },
    defaultValue: {
      // type: Number,
      required: false,
      default: null
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0
    },
    selectInput: {}
  },
  data() {
    return {
      selected: this.selectInput ? '' : this.options?.filter((op) => op.value == this.defaultValue)[0]?.name,
      open: false
    };
  },
  watch: {
    defaultValue() {
      this.selected = this.options?.filter((op) => op.value == this.defaultValue)[0]?.name;
    },
    options() {
      this.selected = this.options?.filter((op) => op.value == this.defaultValue)[0]?.name;
    },
    selected() {}
  },
  updated() {
    // console.log('updated');
  },
  mounted() {
    // this.$emit("input", this.selected);
  },

  directives: {
    ClickOutside
  },
  computed: {
    optionsNew() {
      this.selected = this.selected === undefined ? '' : this.selected;
      const newOption = this.options?.filter((op) => op.name.toLowerCase().includes(this.selected.toLowerCase()));
      // console.log(this.options);
      return newOption.length > 0
        ? newOption
        : [
            {
              name: 'No Options',
              value: -2
            }
          ];
    }
  },
  methods: {
    hideSelect() {
      this.open = false;
    },
    input() {
      this.open = true;
    }
  }
};
</script>
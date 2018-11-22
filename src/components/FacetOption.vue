<template>
    <b-button :variant="variant" :active="active" @click="selected=!selected">{{label}}</b-button>
</template>

<script>
  export default {
    name: 'FacetOption',
    props: {
      label: {
        type: String,
        required: true,
      },
      active: {
        type: Boolean,
        required: false,
        default: false,
      },
    },
    data() {
        return {
          selected: this.active,
        };
    },
    computed: {
      variant() {
        return this.selected ? 'primary' : 'outline-primary';
      },
    },
  };
</script>

<style scoped>

</style>

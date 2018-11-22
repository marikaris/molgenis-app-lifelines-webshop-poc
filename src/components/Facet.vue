<template>
    <div>
        <b-row>
            <b-col>
                <h4>{{this.title}}: <small v-if="this.description"><font-awesome-icon icon="question-circle" /></small></h4>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <FacetOption v-for="option in this.options" :label="option.label"></FacetOption>
            </b-col>
        </b-row>
    </div>
</template>

<script>
  import FacetOption from '../components/FacetOption.vue';
  export default {
    name: 'Facet',
    components: {FacetOption},
    props: {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: false,
      },
      options: {
        type: Array,
        required: true,
      },
    },
  };
</script>

<style scoped>
</style>

<template>
    <b-card :header="this.title ? this.title : ''" bg-variant="default">
        <Facet v-for="facet in this.facets" :categoricalFacet="facet"></Facet>
    </b-card>
</template>

<script>
  import Facet from '../components/Facet.vue'
  export default {
    name: 'FacetContainer',
    components: { Facet },
    props: {
      title: {
        type: String,
        required: false
      },
      facets: {
        type: Array,
        required: true
      }
    }
  }
</script>

<style scoped>

</style>

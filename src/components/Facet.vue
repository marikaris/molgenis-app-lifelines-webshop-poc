<template>
    <div class="facet">
        <b-row>
            <b-col>
                <h4>{{this.categoricalFacet.label}}: <small v-if="this.categoricalFacet.description">
                    <font-awesome-icon icon="question-circle"/></small>
                </h4>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <FacetOption v-for="option in this.categoricalFacet.options" :label="option.label"></FacetOption>
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
      categoricalFacet: {
        type: Object,
        required: true,
      },
    },
  };
</script>
<style scoped>
    .facet{
        margin-bottom: 1rem
    }
</style>

<template>
    <b-container fluid>
        <b-row>
            <b-col md="8">
                <h1>Lifelines data item selection</h1>
            </b-col>
            <b-col md="4">
                <div>
                    <b-button>Save</b-button>
                    <b-button>Reset</b-button>
                    <b-button>Request</b-button>
                </div>
            </b-col>
        </b-row>
        <b-row>
            <b-col md="3">
                <Facet :categoricalFacet="this.$store.state.categorical_facets.ageGroup"></Facet>
                <Facet :categoricalFacet="this.$store.state.categorical_facets.sexGroup"></Facet>
                <Facet :categoricalFacet="this.$store.state.categorical_facets.subCohorts"></Facet>
                <Facet :categoricalFacet="this.$store.state.categorical_facets.collectionPoint"></Facet>
            </b-col>
            <b-col md="2">
               Topic Tree
            </b-col>
            <b-col md="7">
                Data items
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
  import Vue from 'vue'
  import Facet from '../components/Facet.vue'
  import { mapActions } from 'vuex'

  export default Vue.extend({
    name: 'LifelinesWebshop',
    components: { Facet },
    props: {
      msg: String
    },
    methods: {
      ...mapActions([
        'getDataItems',
        'getTopics'
      ])
    },
    mounted () {
      this.getDataItems()
      this.getTopics()
    },
  })
</script>

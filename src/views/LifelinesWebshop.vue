<template>
    <b-container fluid class="mt-2">

        <b-row class="pt-2">
            <b-col md="3">
                <h3 class="nav-title font-weight-bold">Filter items</h3>
            </b-col>
            <b-col md="3">
                <h3 class="nav-title font-weight-bold">Data items</h3>
            </b-col>
            <b-col md="6">
                <div class="float-right">
                    <b-button variant="outline-secondary" class="mr-1 my-2 my-sm-0" type="submit">
                        <font-awesome-icon icon="save"/>
                        Save
                    </b-button>
                    <b-button variant="outline-secondary" class="mr-1 my-2 my-sm-0" type="submit">
                        <font-awesome-icon icon="undo"/>
                        Reset
                    </b-button>
                    <b-button
                            variant="outline-info"
                            class="mr-1 my-2 my-sm-0"
                            type="submit" to="cart"
                            :disabled="selectionCount < 1">
                        <font-awesome-icon icon="shopping-cart"/>
                        Selected Items <span class="badge badge-info">{{selectionCount}}</span>
                    </b-button>
                </div>
            </b-col>

        </b-row>

        <b-row class="mt-2">
            <b-col md="3">
                <b-row>
                    <b-col>
                        <FacetContainer title="Population" :facets="[this.$store.state.categoricalFacets.ageGroup,
                        this.$store.state.categoricalFacets.sexGroup, this.$store.state.categoricalFacets.subCohorts]">
                        </FacetContainer>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <hr/>
                        <FacetContainer :facets="[this.$store.state.categoricalFacets.collectionPoint]"></FacetContainer>
                    </b-col>
                </b-row>
            </b-col>
            <b-col md="9">
                <b-row>
                    <b-col>
                        <b-row>
                            <b-col>
                                <SearchBar elementsToFilter="data-item-card"></SearchBar>
                            </b-col>
                        </b-row>
                        <b-row class="mt-2">
                            <b-col md="3">
                                <topic-tree></topic-tree>
                            </b-col>
                            <b-col md="9">
                                <data-items :dataItems="vueDataItems"></data-items>
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
  import Vue from 'vue'
  import FacetContainer from '@/components/FacetContainer.vue'
  import DataItems from '@/components/DataItems.vue'
  import TopicTree from '@/components/TopicTree.vue'
  import SearchBar from '@/components/SearchBar.vue'
  import { mapGetters, mapActions } from 'vuex'

  export default Vue.extend({
    name: 'LifelinesWebshop',
    components: { DataItems, TopicTree, SearchBar, FacetContainer },
    props: {
      msg: String
    },
    methods: {
      ...mapActions([
        'getDataItems',
        'getTopics',
        'getAgeGroups',
        'getSexGroups',
        'getSubCohorts',
        'getCollectionPoints'
      ])
    },
    computed: {
      ...mapGetters(['vueDataItems', 'selectionCount'])
    },
    mounted () {
      this.getDataItems()
      this.getTopics()
      this.getAgeGroups()
      this.getSexGroups()
      this.getSubCohorts()
      this.getCollectionPoints()
    }
  })
</script>
<style scoped>
    h3.nav-title {
        color: #276daa;
    }
</style>


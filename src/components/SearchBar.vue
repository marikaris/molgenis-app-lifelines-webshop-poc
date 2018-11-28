<template>
    <b-input-group class="search-element">
        <b-form-input
                class="search-bar"
                type="text"
                placeholder="Search"
                v-model="searchTerm"
                @input="filterItems">
        </b-form-input>

        <b-input-group-append>
            <b-btn variant="outline-secondary" @click="filterItems">
                <font-awesome-icon icon="search" size="lg"/>
            </b-btn>
            <b-btn variant="outline-secondary" @click="clearFilter">
                <font-awesome-icon icon="times" size="lg"/>
            </b-btn>
        </b-input-group-append>
    </b-input-group>
</template>

<script>
  import _ from 'lodash'

  export default {
    name: 'SearchBar',
    data () {
      return {
        searchTerm: ''
      }
    },
    methods: {
      filterItems: _.debounce(function () {
        this.$store.commit('setSearchTerm', this.searchTerm)
      }, 500),
      clearFilter () {
        this.searchTerm = ''
        this.$store.commit('setSearchTerm', this.searchTerm)
      }
    },
    computed: {
      selectedSearch () {
        return this.$store.getters.searchTerm
      }
    },
    watch: {
      selectedSearch (newValue, oldvalue) {
        if (newValue !== oldvalue && newValue === '') {
          this.clearFilter()
        }
      }
    }
  }
</script>

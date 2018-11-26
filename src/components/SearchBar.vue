<template>
    <b-input-group>
        <b-form-input
                class="search-bar"
                type="text"
                placeholder="Search"
                v-model="searchTerm"
                @input="filterItems">
        </b-form-input>

        <b-input-group-append>
            <b-btn variant="outline-secondary" class="search-icon" @click="filterItems">
                <font-awesome-icon icon="search"/>
            </b-btn>
        </b-input-group-append>
    </b-input-group>
</template>

<script>
  import _ from 'lodash'

  export default {
    name: 'SearchBar',
    props: {
      elementsToFilter: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        searchTerm: ''
      }
    },
    methods: {
      filterItems: _.debounce(function () {
        this.$store.commit('setSearchTerm', this.searchTerm)
      }, 1000)
    }
  }
</script>

<style scoped>
    .search-icon {
        color: #495057;
        border-color: #ced4da;
        border-style: solid;
        border-width: 1px 1px 1px 0px;
    }

    .search-bar {
        border-width: 1px 0px 1px 1px;
    }
</style>

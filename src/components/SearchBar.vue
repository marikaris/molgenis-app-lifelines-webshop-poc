<template>
    <b-input-group class="search-element">
        <b-form-input
                class="search-bar"
                type="text"
                placeholder=""
                v-model="searchTerm"
                @input="filterItems">
        </b-form-input>

        <b-input-group-append>
            <b-btn variant="outline-secondary" class="search-icon" @click="filterItems">
                <font-awesome-icon icon="search" size="lg"/>
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
    .search-icon, .search-icon:hover, .search-icon:target, .search-icon:active, .search-icon:focus {
        color: rgb(0, 172, 199)!important;
        border-style: none!important;
        background-color: rgb(233, 246, 249)!important;
        border-radius: 0!important;
    }

    .search-bar, .search-bar:hover, .search-bar:focus, .search-bar:active, .search-bar:target {
        border-style: none!important;
        background-color: rgb(233, 246, 249)!important;
        border-radius: 0!important;
    }

    .search-element {
        margin: 2px;
    }
    .search-element:hover, .search-element:focus-within {
        border: solid 2px #00ACC7;
        padding: 0!important;
        margin: 0!important;
    }

    .form-control:focus {
        -webkit-box-shadow: none;
        box-shadow: none!important;
        border: none;
    }
</style>

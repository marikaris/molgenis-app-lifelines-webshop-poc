<template>
  <b-container fluid >

    <b-row class="mt-3">
      <b-col>
        <h3 class=" nav-title font-weight-bold">Selected items</h3>
        <b-list-group>
          <b-list-group-item v-for="topLevelItem in selectedTree" :key="topLevelItem.id">
            {{topLevelItem.label}}
            <b-list-group>
              <b-list-group-item v-for="subLevelItem in topLevelItem.children" :key="subLevelItem.id">
                {{subLevelItem.label}}
                <ul>
                  <li v-for="dataItem in subLevelItem.children">{{dataItem.label}}</li>
                </ul>
              </b-list-group-item>
            </b-list-group>
          </b-list-group-item>

        </b-list-group>
      </b-col>
      <b-col>
        <h3 class="text-center font-weight-bold">Request</h3>
        <b-card class="text-center" style="min-height: 15rem">
          <p>
            Please review the selected items and select request to submit your data request
          </p>
          <b-button
              class="mr-3"
              variant="outline-secondary"
              size="lg"
              type="reset" to="/">
            Change Request
          </b-button>
          <b-button
              class="ml-3"
              variant="info"
              size="lg"
              type="submit">
            Submit Request
          </b-button>
        </b-card>

      </b-col>
    </b-row>

  </b-container>
</template>

<script>
  import Vue from 'vue'
  import DataItems from '@/components/DataItems.vue'
  import TopicTree from '@/components/TopicTree.vue'
  import { mapGetters } from 'vuex'

  export default Vue.extend({
    name: 'LifelinesWebshop',
    components: { DataItems, TopicTree },
    computed: {
      ...mapGetters(['selectedTree'])
    }
  })
</script>
<style scoped>
  h3.nav-title {
    color: #276daa;
  }

  p {
    color: #276daa;
  }

  .card {
    background-color: #f7f7f6;
  }
</style>

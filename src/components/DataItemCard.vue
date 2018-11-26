<template>
  <b-list-group-item @click="$emit('click')"
                     button
                     class="d-flex justify-content-between align-items-center"
                     :active="dataItem.selected"
                     :disabled="!dataItem.enabled">
    {{dataItem.label}}
    <div>
      <b-badge v-for="subCohort in dataItem.subCohorts"
               :variant = "dataItem.selected ? 'light' : 'primary'"
               :key="subCohort.id" class="mr-1"><font-awesome-icon icon="users"/> {{subCohort.label}}
      </b-badge>
      <b-badge v-for="collection in dataItem.collectionPoints"
               :variant = "dataItem.selected ? 'light' : 'secondary'"
               :key="collection.id" class="mr-1"><font-awesome-icon icon="calendar"/> {{collection.label}}
      </b-badge>
    </div>
  </b-list-group-item>
</template>

<script lang="ts">
  // @ts-ignore
  import Vue from 'vue'
  import { VueDataItem } from '../types/vue'

  export default Vue.extend({
    props: {
      dataItem: Object as () => VueDataItem
    }
  })
</script>

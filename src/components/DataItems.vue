<template>
  <div>
    <b-button @click="selectAll">{{ allSelected ? 'Deselect all' : 'Select all' }}</b-button>
    <b-list-group>
      <data-item-card v-for="dataItem in dataItems"
                      :dataItem="dataItem"
                      :key="dataItem.id"
                      class="m-1 rounded"
                      @click="toggleDataItem(dataItem.id)"></data-item-card>
    </b-list-group>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import DataItemCard from './DataItemCard.vue'
import { VueDataItem } from '../types/vue'
import { mapMutations } from 'vuex'

export default Vue.extend({
  name: 'DataItems',
  props: {
    dataItems: Array as () => VueDataItem[]
  },
  methods: {
    ...mapMutations(['toggleDataItem', 'selectAll'])
  },
  computed: {
    allSelected (): boolean {
      return this.dataItems.every((item: VueDataItem): boolean => item.enabled && item.selected)
    }
  },
  components: { DataItemCard }
})
</script>

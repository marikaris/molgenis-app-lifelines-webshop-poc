<template>
  <b-list-group>
    <data-item-card v-for="dataItem in dataItems"
                    :dataItem="dataItem"
                    :key="dataItem.id"
                    class="m-1 rounded"
                    @click="toggleDataItem(dataItem.id)"></data-item-card>
  </b-list-group>
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
    ...mapMutations(['toggleDataItem'])
  },
  components: { DataItemCard }
})
</script>

<template>
  <b-list-group>
    <b-list-group-item v-for="topic in topicList"
                       :key="topic.id"
                       :button="true"
                       :variant="topic.children.length ? 'secondary' : 'default'"
                       :active="topic.selected"
                       @click="topicClick(topic)">
      {{topic.label}}
      {{countItems(topic, item => dataItemSelected(item) && dataItemEnabled(item))}}/{{countItems(topic)}}
    </b-list-group-item>
  </b-list-group>
</template>
<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import { isDefined } from '../store/helpers'

export default {
  name: 'Topic',
  methods: {
    topicClick (topic) {
      if (topic.children.length) {
        this.toggleTopicOpen(topic.id)
      } else {
        this.toggleTopicSelect(topic.id)
      }
    },
    ...mapMutations(['toggleTopicSelect', 'toggleTopicOpen']),
    countItems (topic, itemFilter = () => true) {
      return topic.children.reduce(
        (previous, current) => previous + this.countItems(current, itemFilter), 0)
        + topic.dataItems.map(id => this.allDataItems[id]).filter(isDefined).filter(itemFilter).length
    }
  },
  computed: {
    ...mapGetters(['topicList', 'dataItemSelected', 'dataItemEnabled']),
    ...mapState(['allDataItems'])
  }
}
</script>
<template>
  <b-list-group>
    <b-list-group-item v-for="topic in topicList"
                       :key="topic.id"
                       :button="true"
                       :variant="topic.children.length ? 'secondary' : 'default'"
                       :active="topic.selected"
                       @click="topicClick(topic)">
      {{topic.label}}
    </b-list-group-item>
  </b-list-group>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'

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
    ...mapMutations(['toggleTopicSelect', 'toggleTopicOpen'])
  },
  computed: {
    ...mapGetters(['topicList'])
  }
}
</script>
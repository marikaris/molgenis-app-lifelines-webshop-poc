<template>
    <b-list-group>
        <b-list-group-item v-for="topic in topicList"
                           :key="topic.id"
                           :button="true"
                           :variant="topic.children.length ? 'secondary' : 'default'"
                           :active="topic.selected"
                           @click="topicClick(topic)">
      <span v-if="topic.children.length">
        <font-awesome-icon class="caret-icon" icon="caret-down" v-if="isOpenTopic(topic)"></font-awesome-icon>
          <font-awesome-icon class="caret-icon" icon="caret-right" v-else></font-awesome-icon>  {{topic.label}}
      </span>
            <span v-else class="p-1">
        {{topic.label}}
      </span>
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
      isOpenTopic (topic) {
        return this.$store.state.openTopics.includes(topic.id)
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
<style scoped>
    .caret-icon {
        margin-left: -1rem;
        width: 1rem;
    }
</style>

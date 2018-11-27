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
      isOpenTopic (topic) {
        return this.$store.state.openTopics.includes(topic.id)
      },
      ...mapMutations(['toggleTopicSelect', 'toggleTopicOpen'])
    },
    computed: {
      ...mapGetters(['topicList'])
    }
  }
</script>
<style scoped>
    .caret-icon {
        margin-left: -1rem;
        width: 1rem;
    }
</style>

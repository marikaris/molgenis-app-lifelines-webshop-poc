import { ApplicationState, Identifiable, Topic, TopicNode } from '@/types/store'
import { VueDataItem, VueTopic } from '@/types/vue'

type TermGuard<T> = (x: T | undefined) => x is T

const lookup = <T extends Identifiable> (ids: string[], options: T[]): T[] =>
  ids.map(id => (options || []).find(option => option.id === id))
    .filter((x => x !== undefined) as TermGuard<T>)

const intersects = (a: string[], b: string[]): boolean => {
  return a.filter(value => -1 !== b.indexOf(value)).length > 0
}

const searchTermInTopic = (searchTerm: string, topicOfDataItem: string, topics: Topic[]) => {
  console.log(searchTerm, topicOfDataItem)
  const topic = topics.filter((topic) => topic.id === topicOfDataItem)[0].label
  return searchTermInLabel(searchTerm, topic)
}

const searchTermInLabel = (searchTerm: string, label: string) => {
  return label.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
}

export default {
  topicTree: (state: ApplicationState): TopicNode[] => {
    const isRootTopic = (topic: Topic): boolean => !topic.parentTopicId || topic.parentTopicId === topic.id
    const toTopicNode = (topic: Topic): TopicNode => ({
      id: topic.id,
      label: topic.label,
      children: state.topics
        .filter(child => child.parentTopicId === topic.id)
        .filter(child => child.id !== topic.id)
        .map(toTopicNode)
    })
    return state.topics
      .filter(isRootTopic)
      .map(toTopicNode)
  },
  topicList: (state: ApplicationState, getters: { topicTree: TopicNode[] }): VueTopic[] => {
    const treeWalker = (previous: VueTopic[], current: TopicNode): VueTopic[] => {
      const currentVueTopic = {
        ...current,
        open: state.openTopics.includes(current.id),
        selected: state.selectedOptions.topic === current.id
      }
      const vueTopics = [...previous, currentVueTopic]
      return currentVueTopic.open ? current.children.reduce(treeWalker, vueTopics) : vueTopics
    }
    return getters.topicTree.reduce(treeWalker, [] as VueTopic[])
  },
  vueDataItems: (state: ApplicationState): VueDataItem[] =>
    state.dataItems.filter(item => state.selectedOptions.topic === item.topic)
      .filter(
        item => state.selectedOptions.searchTerm ?
          searchTermInLabel(state.selectedOptions.searchTerm, item.label) ||
          searchTermInTopic(state.selectedOptions.searchTerm, item.topic, state.topics) : true)
      .map(item => ({
        ...item,
        collectionPoints: lookup(item.collectionPoints, state.categoricalFacets.collectionPoint.options),
        ageGroups: lookup(item.ageGroups, state.categoricalFacets.ageGroup.options),
        subCohorts: lookup(item.subCohorts, state.categoricalFacets.subCohorts.options),
        sexGroups: lookup(item.sexGroups, state.categoricalFacets.sexGroup.options),
        topic: lookup([item.topic], state.topics)[0],
        selected: state.selectedDataItems.includes(item.id),
        enabled: intersects(state.selectedOptions.subCohorts, item.subCohorts) ||
        intersects(state.selectedOptions.ageGroup, item.ageGroups) ||
        intersects(state.selectedOptions.sexGroup, item.sexGroups) ||
        intersects(state.selectedOptions.collectionPoint, item.collectionPoints)
      })),
  selectedAgeGroups: (state: ApplicationState): string[] => state.selectedOptions.ageGroup,
  selectedSexGroups: (state: ApplicationState): string[] => state.selectedOptions.sexGroup,
  selectedCollectionPoints: (state: ApplicationState): string[] => state.selectedOptions.collectionPoint,
  selectedSubCohorts: (state: ApplicationState): string[] => state.selectedOptions.subCohorts,
  selectionCount: (state: ApplicationState): number => {
    return state.dataItems.filter(item => {
      return state.selectedDataItems.includes(item.id)
    }).filter(item => {
      return intersects(state.selectedOptions.subCohorts, item.subCohorts) ||
        intersects(state.selectedOptions.ageGroup, item.ageGroups) ||
        intersects(state.selectedOptions.sexGroup, item.sexGroups) ||
        intersects(state.selectedOptions.collectionPoint, item.collectionPoints)
    }).length
  }
}

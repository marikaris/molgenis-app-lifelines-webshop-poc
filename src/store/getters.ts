import {
  ApplicationState,
  CategoricalFacetOption,
  Identifiable,
  Indexed,
  Lookups,
  Topic,
  TopicNode
} from '@/types/store'
import { VueDataItem, VueTopic } from '@/types/vue'

type TermGuard<T> = (x: T | undefined) => x is T
const isDefined = <T> (x: T) => x !== undefined

const indexer = <T extends Identifiable>(table: Indexed<T>, current: T): Indexed<T> => ({
  ...table, [current.id]: current
})

const intersects = (a: string[], b: string[]): boolean => {
  return a.filter(value => -1 !== b.indexOf(value)).length > 0
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
  lookups: (state: ApplicationState): Lookups => ({
    collectionPoint: state.categoricalFacets.collectionPoint.options.reduce(indexer, {} as Indexed<CategoricalFacetOption>),
    ageGroup: state.categoricalFacets.ageGroup.options.reduce(indexer, {} as Indexed<CategoricalFacetOption>),
    sexGroup: state.categoricalFacets.sexGroup.options.reduce(indexer, {} as Indexed<CategoricalFacetOption>),
    subCohorts: state.categoricalFacets.subCohorts.options.reduce(indexer, {} as Indexed<CategoricalFacetOption>),
    topics: state.topics.reduce(indexer, {} as Indexed<Topic>)
  }),
  vueDataItems: (state: ApplicationState, getters: { lookups: Lookups }): VueDataItem[] =>
    state.dataItems.filter(item => state.selectedOptions.topic === item.topic)
      .filter(
        item => state.selectedOptions.searchTerm ? item.label.toLowerCase().indexOf(state.selectedOptions.searchTerm.toLowerCase()) > -1 : true)
      .map(item => ({
        ...item,
        collectionPoints: item.collectionPoints.map(collectionPoint => getters.lookups.collectionPoint[collectionPoint]).filter(isDefined as TermGuard<CategoricalFacetOption>),
        ageGroups: item.ageGroups.map(ageGroup => getters.lookups.ageGroup[ageGroup]).filter(isDefined as TermGuard<CategoricalFacetOption>),
        sexGroups: item.sexGroups.map(sexGroup => getters.lookups.sexGroup[sexGroup]).filter(isDefined as TermGuard<CategoricalFacetOption>),
        subCohorts: item.subCohorts.map(subCohort => getters.lookups.subCohorts[subCohort]).filter(isDefined as TermGuard<CategoricalFacetOption>),
        topic: [getters.lookups.topics[item.topic]].filter(isDefined as TermGuard<Topic>)[0], // hack!!
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

import {
  ApplicationState,
  CategoricalFacetOption,
  DataItem,
  Identifiable,
  Indexed,
  Lookups, SelectedOptions,
  Topic,
  TopicNode
} from '@/types/store'
import { VueDataItem, VueTopic } from '@/types/vue'

type TermGuard<T> = (x: T | undefined) => x is T
const isDefined = <T> (x: T) => x !== undefined

const indexer = <T extends Identifiable>(table: Indexed<T>, current: T): Indexed<T> => ({
  ...table, [current.id]: current
})

type DataItemPredicate = (x: DataItem) => boolean

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
  allDataItems: (state: ApplicationState, getters: { lookups: Lookups }): DataItem [] =>
    state.dataItems.map(
      item => ({
        ...item,
        collectionPoints: item.collectionPoints.map(collectionPoint => getters.lookups.collectionPoint[collectionPoint]).filter(isDefined as TermGuard<CategoricalFacetOption>),
        ageGroups: item.ageGroups.map(ageGroup => getters.lookups.ageGroup[ageGroup]).filter(isDefined as TermGuard<CategoricalFacetOption>),
        sexGroups: item.sexGroups.map(sexGroup => getters.lookups.sexGroup[sexGroup]).filter(isDefined as TermGuard<CategoricalFacetOption>),
        subCohorts: item.subCohorts.map(subCohort => getters.lookups.subCohorts[subCohort]).filter(isDefined as TermGuard<CategoricalFacetOption>),
        topic: [getters.lookups.topics[item.topic]].filter(isDefined as TermGuard<Topic>)[0] // hack!!
      })),
  dataItemEnabled: (state: ApplicationState): DataItemPredicate => {
    const selectedAgeGroups = new Set(state.selectedOptions.ageGroup)
    const selectedCollectionPoints = new Set(state.selectedOptions.collectionPoint)
    const selectedSexGroups = new Set(state.selectedOptions.sexGroup)
    const selectedSubCohorts = new Set(state.selectedOptions.subCohorts)
    return (item: DataItem): boolean =>
      item.sexGroups.some(sexGroup => selectedSexGroups.has(sexGroup.id)) &&
      item.subCohorts.some(subCohort => selectedSubCohorts.has(subCohort.id)) &&
      item.collectionPoints.some(collectionPoint => selectedCollectionPoints.has(collectionPoint.id))
        // && item.ageGroups.some(ageGroup => selectedAgeGroups.has(ageGroup.id))
  },
  dataItemSelected: (state: ApplicationState): DataItemPredicate => {
    const selectedDataItems = new Set(state.selectedDataItems)
    return (item: DataItem): boolean => selectedDataItems.has(item.id)
  },
  topicDataItems: (state: ApplicationState, getters: { allDataItems: DataItem[] }) => getters.allDataItems.filter(item => state.selectedOptions.topic === item.topic.id),
  vueDataItems: (state: ApplicationState, getters: { topicDataItems: DataItem[], dataItemEnabled: DataItemPredicate, dataItemSelected: DataItemPredicate }): VueDataItem[] =>
    getters.topicDataItems
    .filter(item => state.selectedOptions.searchTerm ? item.label.toLowerCase().indexOf(state.selectedOptions.searchTerm.toLowerCase()) > -1 : true)
    .map(item => ({
      ...item,
      enabled: getters.dataItemEnabled(item),
      selected: getters.dataItemSelected(item)
    })),
  selectedAgeGroups: (state: ApplicationState): string[] => state.selectedOptions.ageGroup,
  selectedSexGroups: (state: ApplicationState): string[] => state.selectedOptions.sexGroup,
  selectedCollectionPoints: (state: ApplicationState): string[] => state.selectedOptions.collectionPoint,
  selectedSubCohorts: (state: ApplicationState): string[] => state.selectedOptions.subCohorts,
  selectionCount: (state: ApplicationState, getters: { allDataItems: DataItem[], dataItemEnabled: DataItemPredicate, dataItemSelected: DataItemPredicate }): number => {
    return getters.allDataItems.filter(getters.dataItemEnabled).filter(getters.dataItemSelected).length
  }
}

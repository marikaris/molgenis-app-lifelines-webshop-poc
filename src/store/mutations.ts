import {
  ApplicationState,
  CategoricalFacet,
  CategoricalFacetOption,
  DataItem,
  Identifiable,
  Indexed,
  Lookups,
  RawDataItem,
  TermGuard,
  Topic,
  TopicNode
} from '@/types/store'
import { isDefined, indexer } from '@/store/helpers'

const toggle = (list: string[], item: string): void => {
  if (list.includes(item)) {
    list.splice(list.indexOf(item), 1)
  } else {
    list.push(item)
  }
}

export default {
  selectAll (state: ApplicationState) {
    const topicId = state.selectedOptions.topic
    if (topicId === undefined) {
      return
    }
    const topic = state.lookups.topics[topicId]
    if (topic === undefined) {
      return
    }
    const union = new Set([...state.selectedDataItems, ...topic.dataItems])
    if (union.size > state.selectedDataItems.length) {
      state.selectedDataItems = Array.from(union)
    } else {
      const topicItems = new Set(topic.dataItems)
      state.selectedDataItems = state.selectedDataItems.filter(x => !topicItems.has(x))
    }
  },
  toggleDataItem (state: ApplicationState, id: string) {
    if (state.selectedDataItems.includes(id)) {
      state.selectedDataItems = state.selectedDataItems.filter(x => x !== id)
    } else {
      state.selectedDataItems = [...state.selectedDataItems, id]
    }
  },
  toggleAgeGroupOption (state: ApplicationState, toggledOptionId: string) {
    toggle(state.selectedOptions.ageGroup, toggledOptionId)
  },
  toggleSexGroupOption (state: ApplicationState, toggledOptionId: string) {
    toggle(state.selectedOptions.sexGroup, toggledOptionId)
  },
  toggleSubCohortsOption (state: ApplicationState, toggledOptionId: string) {
    toggle(state.selectedOptions.subCohorts, toggledOptionId)
  },
  toggleCollectionPointOption (state: ApplicationState, toggledOptionId: string) {
    toggle(state.selectedOptions.collectionPoint, toggledOptionId)
  },
  setDataItems (state: ApplicationState, dataItems: RawDataItem[]) {
    state.allDataItems =
      dataItems.map(
        item => ({
          ...item,
          collectionPoints: item.collectionPoints.map(collectionPoint => state.lookups.collectionPoint[collectionPoint]).filter(isDefined as TermGuard<CategoricalFacetOption>),
          ageGroups: item.ageGroups.map(ageGroup => state.lookups.ageGroup[ageGroup]).filter(isDefined as TermGuard<CategoricalFacetOption>),
          sexGroups: item.sexGroups.map(sexGroup => state.lookups.sexGroup[sexGroup]).filter(isDefined as TermGuard<CategoricalFacetOption>),
          subCohorts: item.subCohorts.map(subCohort => state.lookups.subCohorts[subCohort]).filter(isDefined as TermGuard<CategoricalFacetOption>),
          topic: [state.lookups.topics[item.topic]].filter(isDefined as TermGuard<Topic>)[0] // hack!!
        }))
      .reduce(indexer, {} as Indexed<DataItem>)
  },

  setTopics (state: ApplicationState, topics: Topic[]) {
    state.topics = topics
    const isRootTopic = (topic: Topic): boolean => !topic.parentTopicId || topic.parentTopicId === topic.id
    const toTopicNode = (topic: Topic): TopicNode => ({
      id: topic.id,
      label: topic.label,
      dataItems: topic.dataItems,
      children: state.topics
      .filter(child => child.parentTopicId === topic.id)
      .filter(child => child.id !== topic.id)
      .map(toTopicNode)
    })
    state.topicTree = state.topics
      .filter(isRootTopic)
      .map(toTopicNode)
    state.lookups.topics = topics.reduce(indexer, {} as Indexed<Topic>)
  },

  setAgeGroups (state: ApplicationState, ageGroups: CategoricalFacet) {
    state.categoricalFacets.ageGroup = ageGroups
    state.lookups.ageGroup = ageGroups.options.reduce(indexer, {} as Indexed<CategoricalFacetOption>)
  },

  setSexGroups (state: ApplicationState, sexGroups: CategoricalFacet) {
    state.categoricalFacets.sexGroup = sexGroups
    state.lookups.sexGroup = sexGroups.options.reduce(indexer, {} as Indexed<CategoricalFacetOption>)
  },

  setSubCohorts (state: ApplicationState, subCohorts: CategoricalFacet) {
    state.categoricalFacets.subCohorts = subCohorts
    state.lookups.subCohorts = subCohorts.options.reduce(indexer, {} as Indexed<CategoricalFacetOption>)
  },

  setCollectionPoints (state: ApplicationState, collectionPoints: CategoricalFacet) {
    state.categoricalFacets.collectionPoint = collectionPoints
    state.lookups.collectionPoint = collectionPoints.options.reduce(indexer, {} as Indexed<CategoricalFacetOption>)
  },

  setSearchTerm (state: ApplicationState, searchTerm: string) {
    state.selectedOptions.searchTerm = searchTerm
  },

  toggleTopicSelect (state: ApplicationState, id: string) {
    state.selectedOptions.topic = state.selectedOptions.topic === id ? undefined : id
  },

  toggleTopicOpen (state: ApplicationState, id: string) {
    const index = state.openTopics.indexOf(id)
    if (index === -1) {
      state.openTopics.push(id)
    } else {
      state.openTopics.splice(index, 1)
    }
  }
}

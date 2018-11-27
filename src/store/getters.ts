import {
  ApplicationState,
  CategoricalFacetOption,
  DataItem,
  Identifiable,
  Indexed,
  Lookups,
  TermGuard,
  Topic,
  TopicNode
} from '@/types/store'
import { VueDataItem, VueTopic } from '@/types/vue'
import { isDefined } from '@/store/helpers'

type DataItemPredicate = (x: DataItem) => boolean
type Getters = {
  filteredTopicTree: TopicNode[],
  topicList: VueTopic[],
  dataItemEnabled: DataItemPredicate,
  dataItemSelected: DataItemPredicate,
  topicDataItems: DataItem[]
}

const minSearchLength = 3

export default {
  filteredTopicTree: (state: ApplicationState): TopicNode[] => {
    const searchTerm = state.selectedOptions.searchTerm.trim().toLowerCase()
    const matches = (label: string): boolean => label.toLowerCase().indexOf(searchTerm) >= 0

    const filter = (node: TopicNode): TopicNode | undefined => {
      if (searchTerm.length < minSearchLength || matches(node.label)) {
        return node
      }
      const filteredChildren: TopicNode[] = node.children
        .map(filter)
        .filter(isDefined as TermGuard<TopicNode>)
      const filteredDataItems: string[] = node.dataItems
        .map(id => state.allDataItems[id])
        .filter(isDefined as TermGuard<DataItem>)
        .filter(dataItem => matches(dataItem.label))
        .map(dataItem => dataItem.id)
      if (filteredChildren.length || filteredDataItems.length) {
        return { ...node, children: filteredChildren, dataItems: filteredDataItems }
      }
      return undefined
    }
    return state.topicTree.map(filter).filter(isDefined as TermGuard<TopicNode>)
  },
  topicList: (state: ApplicationState, getters: Getters): VueTopic[] => {
    const treeWalker = (previous: VueTopic[], current: TopicNode): VueTopic[] => {
      const currentVueTopic = {
        ...current,
        open: state.openTopics.includes(current.id),
        selected: state.selectedOptions.topic === current.id
      }
      const vueTopics = [...previous, currentVueTopic]
      return currentVueTopic.open ? current.children.reduce(treeWalker, vueTopics) : vueTopics
    }
    return getters.filteredTopicTree.reduce(treeWalker, [] as VueTopic[])
  },
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
  topicDataItems: (state: ApplicationState, getters: Getters): DataItem[] => {
    const selectedTopic: VueTopic | undefined = getters.topicList.find(topic => topic.id === state.selectedOptions.topic)
    if (selectedTopic === undefined) {
      return []
    }
    return selectedTopic.dataItems
        .map((id: string): (DataItem | undefined) => state.allDataItems[id])
        .filter(isDefined as TermGuard<DataItem>)
  },
  vueDataItems: (state: ApplicationState, getters: Getters): VueDataItem[] =>
    getters.topicDataItems
    .map(item => ({
      ...item,
      enabled: getters.dataItemEnabled(item),
      selected: getters.dataItemSelected(item)
    })),
  selectedAgeGroups: (state: ApplicationState): string[] => state.selectedOptions.ageGroup,
  selectedSexGroups: (state: ApplicationState): string[] => state.selectedOptions.sexGroup,
  selectedCollectionPoints: (state: ApplicationState): string[] => state.selectedOptions.collectionPoint,
  selectedSubCohorts: (state: ApplicationState): string[] => state.selectedOptions.subCohorts,
  selectionCount: (state: ApplicationState, getters: Getters): number => {
    return Object.values(state.allDataItems)
      .filter(isDefined as TermGuard<DataItem>)
      .filter(getters.dataItemEnabled)
      .filter(getters.dataItemSelected)
      .length
  },
  selectedTree: (state: ApplicationState): any => {
    return [{
      id: 'gis_data',
      label: 'GIS Data',
      children: [
        {
          id: 'air_polution',
          label: 'Air pollution',
          children: [
            {
              ageGroups: [],
              sexGroups: [],
              subCohorts: [],
              collectionPoints: [],
              label: 'Start date',
              description: 'The start date description'
            },
            {
              ageGroups: [],
              sexGroups: [],
              subCohorts: [],
              collectionPoints: [],
              label: 'End date',
              description: 'The end date description'
            }
          ]
        },
        {
          id: 'noise_exposure',
          label: 'Noise exposure',
          children: [
            {
              ageGroups: [],
              sexGroups: [],
              subCohorts: [],
              collectionPoints: [],
              label: 'Hourly road traffic noise estimate 00:00',
              description: 'description'
            },
            {
              ageGroups: [],
              sexGroups: [],
              subCohorts: [],
              collectionPoints: [],
              label: 'Hourly road traffic noise estimate 13:00',
              description: 'description'
            }
          ]
        }
      ],
      dataItems: []
    }]
  }
}

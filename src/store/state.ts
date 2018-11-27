import ApplicationState, { CategoricalFacetOption, Indexed, Lookups, Topic } from '@/types/store'

const state: ApplicationState = {
  allDataItems: {},
  topics: [],
  topicTree: [],
  categoricalFacets: {
    collectionPoint: { id: 'collectionPoint', label: '', options: [] },
    ageGroup:  { id: 'ageGroup', label: '', options: [] },
    sexGroup:  { id: 'sexGroup', label: '', options: [] },
    subCohorts:  { id: 'subCohorts', label: '', options: [] }
  },
  selectedOptions: {
    ageGroup: [],
    sexGroup: [],
    subCohorts: [],
    topic: undefined,
    collectionPoint: [],
    searchTerm: ''
  },
  lookups: {
    collectionPoint: {},
    ageGroup: {},
    sexGroup: {},
    subCohorts: {},
    topics: {}
  } as Lookups,
  openTopics: [],
  selectedDataItems: []
}

export default state

import ApplicationState, { CategoricalFacetOption, Indexed, Lookups, Topic } from '@/types/store'

const state: ApplicationState = {
  allDataItems: {},
  topics: [],
  topicTree: [],
  categoricalFacets: {
    collectionPoint: { id: 'collectionPoint', label: '', options: [], description: '' },
    ageGroup:  { id: 'ageGroup', label: '', options: [], description: '' },
    sexGroup:  { id: 'sexGroup', label: '', options: [], description: '' },
    subCohorts:  { id: 'subCohorts', label: '', options: [], description: '' }
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

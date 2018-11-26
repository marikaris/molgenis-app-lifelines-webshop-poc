import ApplicationState from '@/types/store'

const state: ApplicationState = {
  dataItems: [],
  topics: [],
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
  openTopics: [],
  selectedDataItems: []
}

export default state

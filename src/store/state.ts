import ApplicationState from '@/types/store/applicationState'

const state: ApplicationState = {
  dataItems: [],
  topics: [],
  categoricalFacets: {
    collectionPoint: {},
    ageGroup: {},
    sexGroup: {},
    subCohorts: {}
  },
  selectedOptions: {
    ageGroup: ['0-3', '3-7'],
    sexGroup: [],
    subCohorts: [],
    collectionPoint: ['baseline'],
    searchTerm: 'hallo, ik sta in de state'
  },
  selectedDataItems: ['var1']
}

export default state

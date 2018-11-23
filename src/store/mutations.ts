import ApplicationState from '@/types/store/applicationState'
import DataItem from '@/types/store/dataItem'
import Topic from '@/types/store/topic'
import CategoricalFacet from '@/types/store/categoricalFacet'

export default {

  setDataItems (state: ApplicationState, dataItems: DataItem[]) {
    state.dataItems = dataItems
  },

  setTopics (state: ApplicationState, topics: Topic[]) {
    state.topics = topics
  },

  setAgeGroups (state: ApplicationState, ageGroups: CategoricalFacet) {
    state.categoricalFacets.ageGroup = ageGroups
  },

  setSexGroups (state: ApplicationState, sexGroups: CategoricalFacet) {
    state.categoricalFacets.sexGroup = sexGroups
  },

  setSubCohorts (state: ApplicationState, subCohorts: CategoricalFacet) {
    state.categoricalFacets.subCohorts = subCohorts
  },

  setCollectionPoints (state: ApplicationState, collectionPoints: CategoricalFacet) {
    state.categoricalFacets.collectionPoint = collectionPoints
  }
}
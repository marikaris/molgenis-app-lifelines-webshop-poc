import dataItemRepository from '@/repository/dataItemRepository'
import topicRepository from '@/repository/topicRepository'
import categoricalFacetRepository from '@/repository/categoricalFacetRepository'

export default {

  getDataItems ({ commit }: any): void {
    dataItemRepository.getAll().then((dataItems) => {
      commit('setDataItems', dataItems)
    }).catch()
  },

  getTopics ({ commit }: any) {
    topicRepository.getAll().then((topics) => {
      commit('setTopics', topics)
    }).catch()
  },

  getAgeGroups ({ commit }: any) {
    categoricalFacetRepository.getAgeGroups().then((ageGroups) => {
      commit('setAgeGroups', ageGroups)
    }).catch()
  },

  getSexGroups ({ commit }: any) {
    categoricalFacetRepository.getSexGroups().then((sexGroups) => {
      commit('setSexGroups', sexGroups)
    }).catch()
  },

  getSubCohorts ({ commit }: any) {
    categoricalFacetRepository.getSubCohorts().then((subCohorts) => {
      commit('setSubCohorts', subCohorts)
    }).catch()
  },

  getCollectionPoints ({ commit }: any) {
    categoricalFacetRepository.getCollectionPoints().then((collectionPoints) => {
      commit('setCollectionPoints', collectionPoints)
    }).catch()
  }
}

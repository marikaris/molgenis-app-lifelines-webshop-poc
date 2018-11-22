// @ts-ignore
import api from '@molgenis/molgenis-api-client'
import Topic from '@/types/store/topic'
import DataItem from '@/types/store/dataItem'
import CategoricalFacet from '@/types/store/categoricalFacet'
import CategoricalFacetOption from '@/types/store/categoricalFacetOption'

const refToId = (ref: any): string => ref.id

const toDataItem = (item: any): DataItem => {
  return {
    id: item.id,
    ageGroups: item.ageGroups,
    sexGroups: item.sexGroups.map(refToId),
    subCohorts: item.subcohorts.map(refToId),
    collectionPoints: item.collections.map(refToId),
    topic: item.topic.id,
    label: item.label,
    ordinalPosition: item.ordinalPosition,
    description: item.description
  }
}

const toTopic = (item: any): Topic => {
  const topic: Topic = {
    id: item.id,
    label: item.label
  }

  if (item.parent) {
    topic.parentTopicId = refToId(item.parent)
  }

  return topic
}

const toCategoricalFacetOption = (item: any): CategoricalFacetOption => {
  return {
    id: item.id,
    label: item.label
  }
}

const toCategoricalFacet = (response: any): CategoricalFacet => {
  return {
    label: response.meta.label,
    options: response.items.map(toCategoricalFacetOption)
  }
}

export default {

  getDataItems ({ commit }: any) {
    api.get('api/v2/lifelines_dataItems').then((response: any) => {
      commit('setDataItems', response.items.map(toDataItem))
    })
  },

  getTopics ({ commit }: any) {
    api.get('api/v2/lifelines_topics').then((response: any) => {
      commit('setTopics', response.items.map(toTopic))
    })
  },

  getAgeGroups ({ commit }: any) {
    api.get('api/v2/lifelines_ageGroups').then((response: any) => {
      commit('setAgeGroups', toCategoricalFacet(response))
    })
  },

  getSexGroups ({ commit }: any) {
    api.get('api/v2/lifelines_sexGroups').then((response: any) => {
      commit('setSexGroups', toCategoricalFacet(response))
    })
  },

  getSubCohorts ({ commit }: any) {
    api.get('api/v2/lifelines_subcohorts').then((response: any) => {
      commit('setSubCohorts', toCategoricalFacet(response))
    })
  },

  getCollectionPoints ({ commit }: any) {
    api.get('api/v2/lifelines_collections').then((response: any) => {
      commit('setCollectionPoints', toCategoricalFacet(response))
    })
  }
}

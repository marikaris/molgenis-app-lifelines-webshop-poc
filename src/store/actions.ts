// @ts-ignore
import api from '@molgenis/molgenis-api-client'

const toDataItem = (item: any) => {
  return {
    id: item.id,
    ageGroups: item.ageGroups,
    sexGroups: item.sexGroups.map((sg: any) => sg.id),
    subCohorts: item.subcohorts.map((sc: any) => sc.id),
    collectionPoints: item.collections.map((c: any) => c.id),
    topic: item.topic.id,
    label: item.label,
    ordinalPosition: item.ordinalPosition,
    description: item.description
  }
}

export default {

  getDataItems ({ commit }: any) {
    api.get('api/v2/lifelines_dataItems').then((response: any) => {
      commit('setDataItems', response.items.map(toDataItem))
    })
  }
}

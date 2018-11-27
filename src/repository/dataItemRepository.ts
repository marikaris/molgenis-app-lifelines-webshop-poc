// @ts-ignore
import api from '@molgenis/molgenis-api-client'
import { RawDataItem } from '@/types/store'

const refToId = (ref: any): string => ref.id

const toDataItem = (item: any): RawDataItem => {
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

export default {
  getAll (): Promise<RawDataItem[]> {
    return api.get('api/v2/lifelines_dataItems?num=10000').then((response: any) => {
      return response.items.map(toDataItem)
    })
  }
}

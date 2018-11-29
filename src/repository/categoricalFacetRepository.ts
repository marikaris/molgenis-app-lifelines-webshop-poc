// @ts-ignore
import api from '@molgenis/molgenis-api-client'
import { CategoricalFacet, CategoricalFacetOption } from '@/types/store'

const toCategoricalFacetOption = (item: any): CategoricalFacetOption => {
  return {
    id: item.id,
    label: item.label
  }
}

const toCategoricalFacet = (response: any, id: string): CategoricalFacet => {
  return {
    id,
    label: response.meta.label,
    options: response.items.map(toCategoricalFacetOption),
    description: response.meta.description
  }
}

export default {
  getAgeGroups (): Promise<CategoricalFacet[]> {
    return api.get('api/v2/lifelines_ageGroups?sort=ordinalPosition:asc').then((response: any) => {
      return toCategoricalFacet(response, 'ageGroup')
    })
  },

  getSexGroups (): Promise<CategoricalFacet[]> {
    return api.get('api/v2/lifelines_sexGroups?sort=ordinalPosition:asc').then((response: any) => {
      return toCategoricalFacet(response, 'sexGroup')
    })
  },

  getSubCohorts (): Promise<CategoricalFacet[]> {
    return api.get('api/v2/lifelines_subcohorts?sort=ordinalPosition:asc').then((response: any) => {
      return toCategoricalFacet(response, 'subCohorts')
    })
  },

  getCollectionPoints (): Promise<CategoricalFacet[]> {
    return api.get('api/v2/lifelines_collections?sort=ordinalPosition:asc').then((response: any) => {
      return toCategoricalFacet(response, 'collectionPoint')
    })
  }
}

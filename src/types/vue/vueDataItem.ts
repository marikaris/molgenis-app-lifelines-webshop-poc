import CategoricalFacetOption from '@/types/store/categoricalFacetOption'
import Topic from '@/types/store/topic'

export default interface VueDataItem {
  ageGroups: CategoricalFacetOption[]
  sexGroups: CategoricalFacetOption[]
  subCohorts: CategoricalFacetOption[]
  collectionPoints: CategoricalFacetOption[]
  topic: Topic
  label: string
  description: string,
  enabled: boolean,
  selected: boolean
}

import { CategoricalFacetOption, Identifiable, Topic, TopicNode } from '@/types/store'

export interface VueDataItem {
  ageGroups: CategoricalFacetOption[]
  sexGroups: CategoricalFacetOption[]
  subCohorts: CategoricalFacetOption[]
  collectionPoints: CategoricalFacetOption[]
  topic: Topic
  label: string
  description: string
  enabled: boolean
  selected: boolean
}

export interface VueTopic extends TopicNode {
  selected: boolean
  open: boolean
}

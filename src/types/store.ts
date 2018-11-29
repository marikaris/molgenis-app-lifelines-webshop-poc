export interface Identifiable {
  id: string
}

export interface CategoricalFacetOption extends Identifiable {
  label: string
}

export interface CategoricalFacet extends Identifiable {
  label: string
  options: CategoricalFacetOption[],
  description: string
}

export interface CategoricalFacets {
  collectionPoint: CategoricalFacet
  ageGroup: CategoricalFacet
  sexGroup: CategoricalFacet
  subCohorts: CategoricalFacet
}

export type Indexed<T> = { [index: string]: T | undefined }

export interface Lookups {
  collectionPoint: Indexed<CategoricalFacetOption>
  ageGroup: Indexed<CategoricalFacetOption>
  sexGroup: Indexed<CategoricalFacetOption>
  subCohorts: Indexed<CategoricalFacetOption>
  topics: Indexed<Topic>
}

export interface RawDataItem extends Identifiable {
  ageGroups: string[]
  sexGroups: string[]
  subCohorts: string[]
  collectionPoints: string[]
  topic: string
  label: string
  ordinalPosition: number
  description: string
}

export interface DataItem extends Identifiable {
  ageGroups: CategoricalFacetOption[]
  sexGroups: CategoricalFacetOption[]
  subCohorts: CategoricalFacetOption[]
  collectionPoints: CategoricalFacetOption[]
  topic: Topic
  label: string
  description: string
}

export interface Topic extends Identifiable {
  label: string
  parentTopicId?: string
  dataItems: string[]
}

export interface TopicNode extends Topic {
  children: TopicNode[]
}

export type SelectedOptions = {
  ageGroup: string[]
  sexGroup: string[]
  subCohorts: string[]
  collectionPoint: string[]
  topic?: string
  searchTerm: string
}

export interface ApplicationState {
  allDataItems: Indexed<DataItem>
  topics: Topic[]
  topicTree: TopicNode[]
  categoricalFacets: CategoricalFacets
  selectedOptions: SelectedOptions
  selectedDataItems: string[]
  openTopics: string[]
  lookups: Lookups
}

export default ApplicationState

export type TermGuard<T> = (x: T | undefined) => x is T

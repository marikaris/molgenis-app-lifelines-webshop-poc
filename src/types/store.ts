export interface Identifiable {
  id: string
}

export interface CategoricalFacetOption extends Identifiable {
  label: string
}

export interface CategoricalFacet extends Identifiable {
  label: string
  options: CategoricalFacetOption[]
}

export interface CategoricalFacets {
  collectionPoint: CategoricalFacet
  ageGroup: CategoricalFacet
  sexGroup: CategoricalFacet
  subCohorts: CategoricalFacet
}

export type Indexed<T> = {[index: string]: T | undefined}

export interface Lookups {
  collectionPoint: Indexed<CategoricalFacetOption>
  ageGroup: Indexed<CategoricalFacetOption>
  sexGroup: Indexed<CategoricalFacetOption>
  subCohorts: Indexed<CategoricalFacetOption>
  topics: Indexed<Topic>
}

export interface DataItem extends Identifiable {
  ageGroups: string[]
  sexGroups: string[]
  subCohorts: string[]
  collectionPoints: string[]
  topic: string
  label: string
  ordinalPosition: number
  description: string
}

export interface Topic extends Identifiable {
  label: string
  parentTopicId?: string
}

export interface TopicNode extends Topic {
  children: TopicNode[]
}

export interface ApplicationState {
  dataItems: DataItem[]
  topics: Topic[]
  categoricalFacets: CategoricalFacets
  selectedOptions: {
    ageGroup: string[];
    sexGroup: string[];
    subCohorts: string[];
    collectionPoint: string[];
    topic?: string
    searchTerm: string;
  }
  selectedDataItems: string[]
  openTopics: string[]
}

export default ApplicationState

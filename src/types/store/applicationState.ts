import DataItem from './dataItem'
import Topic from './topic'
import CategoricalFacets from '@/types/store/categoricalFacets'

export default interface ApplicationState {
  dataItems: DataItem[]
  topics: Topic[]
  categoricalFacets: CategoricalFacets
  selectedOptions: {
    ageGroup: string[];
    sexGroup: string[];
    subCohorts: string[];
    collectionPoint: string[];
    searchTerm: string;
  }
  selectedDataItems: string[]
}
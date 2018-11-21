export interface DataItem {
    id: string;
    ageGroups: string[];
    sexGroups: string[];
    subCohorts: string[];
    collectionPoints: string[];
    topic: string;
    label: string;
    ordinalPosition: number;
    description: string;
}

export interface Topic {
    id: string;
    label: string;
    parentTopicId?: string;
}

export interface CategoricalFacetOption {
    id: string;
    label: string;
}

export interface CategoricalFacet {
    label: string;
    options: CategoricalFacetOption[];
}

export interface CategoricalFacets {
    collectionPoint: CategoricalFacet;
    ageGroup: CategoricalFacet;
    sexGroup: CategoricalFacet;
    subCohorts: CategoricalFacet;
}

export interface ApplicationState {
    dataItems: DataItem[];
    topics: Topic[];
    categorical_facets: CategoricalFacets;
    selectedOptions: {
        ageGroup: string[];
        sexGroup: string[];
        subCohorts: string[];
        collectionPoint: string[];
        searchTerm: string;
    };
    selectedDataItems: string[];
}

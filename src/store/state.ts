import ApplicationState from '@/types/store/applicationState'

const state: ApplicationState = {
  dataItems: [
    {
      id: 'var1',
      ageGroups: [],
      sexGroups: ['M', 'F'],
      subCohorts: [],
      collectionPoints: [],
      topic: 'family-relations',
      label: 'Relation type',
      ordinalPosition: 382,
      description: 'Relation type'
    },
    {
      id: 'var10',
      ageGroups: ['0-3', '4-7', '8-12', '13-17', '18-64', '65+'],
      sexGroups: ['M', 'F'],
      subCohorts: ['baseline', 'next'],
      collectionPoints: ['baseline'],
      topic: 'Place of birth',
      label: 'Country of birth',
      ordinalPosition: 901,
      description: 'Country of birth'
    }],
  topics: [
    {
      id: 'air-polution',
      label: 'Air pollution',
      parentTopicId: 'gis-data'
    },
    {
      id: 'family-relations',
      label: 'Family Relations'
    },
    {
      id: 'geographical-information',
      label: 'Geographical information'
    },
    {
      id: 'gis-data',
      label: 'GIS data'
    },
    {
      id: 'interview',
      label: 'Interview'
    },
    {
      id: 'municipal-district-neighbourhood-codes',
      label: 'Municipal District Neighbourhood codes',
      parentTopicId: 'geographical-information'
    },
    {
      id: 'noise-exposure',
      label: 'Noise exposure',
      parentTopicId: 'gis-data'
    },
    {
      id: 'pilot-mini',
      label: 'Pilot MINI',
      parentTopicId: 'interview'
    },
    {
      id: 'place-of-birth',
      label: 'Place of birth',
      parentTopicId: 'geographical-information'
    },
    {
      id: 'postal-code-4-baseline-visit-1',
      label: 'Postal code 4 Baseline visit 1',
      parentTopicId: 'geographical-information'
    },
    {
      id: 'v1-mini',
      label: 'V1 MINI',
      parentTopicId: 'interview'
    },
    {
      id: 'v2-mini',
      label: 'V2 MINI',
      parentTopicId: 'interview'
    },
    {
      id: 'v3-mini',
      label: 'V3 MINI',
      parentTopicId: 'interview'
    }
  ],

  categoricalFacets: {
    collectionPoint: {},
    ageGroup: {},
    sexGroup: {},
    subCohorts: {}
  },
  selectedOptions: {
    ageGroup: ['0-3', '3-7'],
    sexGroup: [],
    subCohorts: [],
    collectionPoint: ['baseline'],
    searchTerm: 'hallo, ik sta in de state'
  },
  selectedDataItems: ['var1']
}

export default state

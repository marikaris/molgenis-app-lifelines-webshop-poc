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

  categorical_facets: {
    collectionPoint: {
      label: 'Collection point',
      options: [
        {
          id: 'baseline',
          label: 'baseline'
        },
        {
          id: 'follow-up-1b',
          label: 'follow-up 1B'
        },
        {
          id: 'follow-up-1c',
          label: 'follow-up 1C'
        },
        {
          id: 'next',
          label: 'next'
        },
        {
          id: 'second-assessment-2',
          label: 'second assessment 2'
        }
      ]
    },
    ageGroup: {
      label: 'Age',
      options: [
        {
          id: '0-3',
          label: '0-3'
        },
        {
          id: '4-7',
          label: '4-7'
        },
        {
          id: '8-12',
          label: '8-12'
        },
        {
          id: '13-17',
          label: '13-17'
        },
        {
          id: '18-64',
          label: '18-64'
        },
        {
          id: '65+',
          label: '65+'
        }
      ]
    },
    sexGroup: {
      label: 'Sex Group',
      options: [
        {
          id: 'F',
          label: 'Female'
        },
        {
          id: 'M',
          label: 'Male'
        }
      ]
    },
    subCohorts: {
      label: 'Sub cohorts',
      options: [
        {
          id: 'baseline',
          label: 'baseline'
        },
        {
          id: 'next',
          label: 'next'
        }
      ]
    }
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

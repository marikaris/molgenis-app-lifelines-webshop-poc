import Identifiable from '@/types/store/identifiable'

export default interface DataItem extends Identifiable {
  ageGroups: string[]
  sexGroups: string[]
  subCohorts: string[]
  collectionPoints: string[]
  topic: string
  label: string
  ordinalPosition: number
  description: string
}

import Identifiable from '@/types/store/identifiable'

export default interface Topic extends Identifiable {
  label: string
  parentTopicId?: string
}

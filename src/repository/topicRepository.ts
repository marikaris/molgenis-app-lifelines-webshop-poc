// @ts-ignore
import api from '@molgenis/molgenis-api-client'
import DataItem from '@/types/store/dataItem'
import Topic from '@/types/store/topic'

const refToId = (ref: any): string => ref.id

const toTopic = (item: any): Topic => {
  const topic: Topic = {
    id: item.id,
    label: item.label
  }

  if (item.parent) {
    topic.parentTopicId = refToId(item.parent)
  }

  return topic
}

export default {
  getAll (): Promise<Topic[]> {
    return api.get('api/v2/lifelines_topics').then((response: any) => {
      return response.items.map(toTopic)
    })
  }
}

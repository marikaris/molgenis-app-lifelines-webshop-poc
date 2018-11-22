// @ts-ignore
import api from '@molgenis/molgenis-api-client';
import Topic from '@/types/store/topic';

const refToId = (ref: any) => ref.id;

const toDataItem = (item: any) => {
  return {
    id: item.id,
    ageGroups: item.ageGroups,
    sexGroups: item.sexGroups.map(refToId),
    subCohorts: item.subcohorts.map(refToId),
    collectionPoints: item.collections.map(refToId),
    topic: item.topic.id,
    label: item.label,
    ordinalPosition: item.ordinalPosition,
    description: item.description,
  };
};

const toTopic = (item: any) => {
  const topic: Topic = {
    id: item.id,
    label: item.label,
  };

  if (item.parent) {
    topic.parentTopicId = refToId(item.parent);
  }

  return topic;

};

export default {

  getDataItems({commit}: any) {
    api.get('api/v2/lifelines_dataItems').then((response: any) => {
      commit('setDataItems', response.items.map(toDataItem));
    });
  },

  getTopics({commit}: any) {
    api.get('api/v2/lifelines_topics').then((response: any) => {
      commit('setTopics', response.items.map(toTopic));
    });
  },
};

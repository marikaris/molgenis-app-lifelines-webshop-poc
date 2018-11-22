import {ApplicationState, DataItem} from '@/types';

export default {

  setDataItems(state: ApplicationState, dataItems: DataItem[]) {
    state.dataItems = dataItems;
  },
};

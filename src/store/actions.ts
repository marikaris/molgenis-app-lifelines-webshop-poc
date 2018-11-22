// @ts-ignore
import api from '@molgenis/molgenis-api-client';

export default {

  getDataItems() {
    api.get('api/v2/lifelines_dataItems');
  },
};

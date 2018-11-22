import ApplicationState from '@/types/store/applicationState'
import DataItem from '@/types/store/dataItem'

export default {

  setDataItems (state: ApplicationState, dataItems: DataItem[]) {
    state.dataItems = dataItems
  }
}

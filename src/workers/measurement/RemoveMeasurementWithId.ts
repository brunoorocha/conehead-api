import Store from '../../services/store/Store'
import Measurement from '../../models/Measurement'

const removeMeasurementWithId = async (measurementId: string, measurementStore: Store<Measurement>): Promise<Measurement> => {
  const measurement = await measurementStore.remove(measurementId)
  return measurement
}

export default removeMeasurementWithId

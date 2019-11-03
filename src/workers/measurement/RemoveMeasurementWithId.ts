import OwnableDataStore from '../../services/store/OwnableDataStore'
import Measurement from '../../models/Measurement'

const removeMeasurementWithId = async (measurementId: string, userId: string, measurementStore: OwnableDataStore<Measurement>): Promise<Measurement> => {
  const measurement = await measurementStore.remove(measurementId, userId)
  return measurement
}

export default removeMeasurementWithId

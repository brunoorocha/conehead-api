import OwnableDataStore from '../../services/store/OwnableDataStore'
import Measurement from '../../models/Measurement'

const getMeasurementWithId = async (measurementId: string, userId: string, measurementStore: OwnableDataStore<Measurement>): Promise<Measurement> => {
  const measurement = await measurementStore.get(measurementId, userId)
  return measurement
}

export default getMeasurementWithId

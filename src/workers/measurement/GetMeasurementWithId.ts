import Store from '../../services/store/Store'
import Measurement from '../../models/Measurement'

const getMeasurementWithId = async (measurementId: string, measurementStore: Store<Measurement>): Promise<Measurement> => {
  const measurement = await measurementStore.get(measurementId)
  return measurement
}

export default getMeasurementWithId

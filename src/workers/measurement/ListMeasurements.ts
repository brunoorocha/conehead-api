import Store from '../../services/store/Store'
import Measurement from '../../models/Measurement'

const listMeasurements = async (measurementStore: Store<Measurement>): Promise<Measurement[]> => {
  const measurements = await measurementStore.fetchAll()
  return measurements
}

export default listMeasurements

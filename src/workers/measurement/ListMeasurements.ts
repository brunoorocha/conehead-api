import OwnableDataStore from '../../services/store/OwnableDataStore'
import Measurement from '../../models/Measurement'

const listMeasurements = async (userId: string, measurementStore: OwnableDataStore<Measurement>): Promise<Measurement[]> => {
  const measurements = await measurementStore.fetchAll(userId)
  return measurements
}

export default listMeasurements

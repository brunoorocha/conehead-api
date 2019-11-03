import OwnableDataStore from '../../services/store/OwnableDataStore'
import Measurement from '../../models/Measurement'

const createMeasurement = async (name: string, abbreviation: string, userId: string, measurementStore: OwnableDataStore<Measurement>): Promise<Measurement> => {
  const measurement = new Measurement(null, name, abbreviation)
  const storedMeasurement = await measurementStore.save(measurement, userId)
  return storedMeasurement
}

export default createMeasurement

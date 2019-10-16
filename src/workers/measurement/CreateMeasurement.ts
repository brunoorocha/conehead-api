import Store from '../../services/store/Store'
import Measurement from '../../models/Measurement'

const createMeasurement = async (name: string, measurementStore: Store<Measurement>): Promise<Measurement> => {
  const measurement = new Measurement(null, name)
  const storedMeasurement = await measurementStore.save(measurement)
  return storedMeasurement
}

export default createMeasurement

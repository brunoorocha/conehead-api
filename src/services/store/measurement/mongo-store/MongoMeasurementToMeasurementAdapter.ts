import { MongoMeasurementInterface } from './MongoMeasurementSchema'
import Measurement from '../../../../models/Measurement'

class MongoMeasurementToMeasurementAdapter {
  public static make (mongoMeasurement: MongoMeasurementInterface): Measurement {
    if (!mongoMeasurement) { return null }
    const measurement = new Measurement(
      mongoMeasurement._id,
      mongoMeasurement.name,
      mongoMeasurement.abbreviation
    )

    return measurement
  }
}

export default MongoMeasurementToMeasurementAdapter

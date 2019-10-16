import Store from '../../Store'
import { MongoMeasurement } from './MongoMeasurementSchema'
import Measurement from '../../../../models/Measurement'
import MongoMeasurementToMeasurementAdapter from './MongoMeasurementToMeasurementAdapter'

class MongoMeasurementStore implements Store<Measurement> {
  public async fetchAll (): Promise<Measurement[]> {
    const mongoMeasurements = await MongoMeasurement.find()
    const measurements = mongoMeasurements.map(mongoMeasurement => MongoMeasurementToMeasurementAdapter.make(mongoMeasurement))
    return measurements
  }

  public async save (measurement: Measurement): Promise<Measurement> {
    const mongoMeasurement = await MongoMeasurement.create({
      name: measurement.name,
      abbreviation: measurement.abbreviation
    })

    return MongoMeasurementToMeasurementAdapter.make(mongoMeasurement)
  }

  public async get (measurementId: string): Promise<Measurement> {
    const mongoMeasurement = await MongoMeasurement.findById(measurementId)
    return MongoMeasurementToMeasurementAdapter.make(mongoMeasurement)
  }

  public async remove (measurementId: string): Promise<Measurement> {
    const mongoMeasurement = await MongoMeasurement.findById(measurementId)
    MongoMeasurement.deleteOne({ _id: measurementId }, error => {
      if (error) {
        console.log(error)
      }
    })

    return MongoMeasurementToMeasurementAdapter.make(mongoMeasurement)
  }
}

export default MongoMeasurementStore

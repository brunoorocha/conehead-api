import OwnableDataStore from '../../OwnableDataStore'
import { MongoMeasurement } from './MongoMeasurementSchema'
import Measurement from '../../../../models/Measurement'
import MongoMeasurementToMeasurementAdapter from './MongoMeasurementToMeasurementAdapter'
import { UnauthorizedObjectAccessError } from '../../../../models/errors/DataStoreErrors'

class MongoMeasurementStore implements OwnableDataStore<Measurement> {
  public async fetchAll (ownerId: string): Promise<Measurement[]> {
    const mongoMeasurements = await MongoMeasurement.find({ owner: ownerId })
    const measurements = mongoMeasurements.map(mongoMeasurement => MongoMeasurementToMeasurementAdapter.make(mongoMeasurement))
    return measurements
  }

  public async save (measurement: Measurement, ownerId: string): Promise<Measurement> {
    const mongoMeasurement = await MongoMeasurement.create({
      name: measurement.name,
      abbreviation: measurement.abbreviation,
      owner: ownerId
    })

    return MongoMeasurementToMeasurementAdapter.make(mongoMeasurement)
  }

  public async get (measurementId: string, ownerId: string): Promise<Measurement> {
    const mongoMeasurement = await MongoMeasurement.findById(measurementId)
    if (mongoMeasurement.owner !== ownerId) {
      return Promise.reject(new UnauthorizedObjectAccessError())
    }

    return MongoMeasurementToMeasurementAdapter.make(mongoMeasurement)
  }

  public async remove (measurementId: string, ownerId: string): Promise<Measurement> {
    const mongoMeasurement = await MongoMeasurement.findById(measurementId)
    if (mongoMeasurement.owner !== ownerId) {
      return Promise.reject(new UnauthorizedObjectAccessError())
    }

    MongoMeasurement.deleteOne({ _id: measurementId }, error => {
      if (error) {
        console.log(error)
      }
    })

    return MongoMeasurementToMeasurementAdapter.make(mongoMeasurement)
  }
}

export default MongoMeasurementStore

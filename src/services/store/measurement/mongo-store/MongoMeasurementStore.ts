import Store from '../../Store'
import { MongoMeasurement } from './MongoMeasurementSchema'
import Measurement from '../../../../models/Measurement'
import MongoMeasurementToMeasurementAdapter from './MongoMeasurementToMeasurementAdapter'
import { UnableToRemoveObjectError, ObjectNotFoundError } from '../../../../models/errors/DataStoreErrors'

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

  public get = async (measurementId: string): Promise<Measurement> => {
    const measurement = await this.findMeasurement(measurementId)
    return measurement
  }

  public remove = async (measurementId: string): Promise<Measurement> => {
    const measurement = await this.findMeasurement(measurementId)
    MongoMeasurement.deleteOne({ _id: measurement.id }, error => {
      if (error) {
        return Promise.reject(new UnableToRemoveObjectError(error))
      }
    })

    return measurement
  }

  private async findMeasurement (measurementId: string): Promise<Measurement> {
    const mongoMeasurement = await MongoMeasurement.findById(measurementId)

    if (!mongoMeasurement) {
      return Promise.reject(new ObjectNotFoundError('Measure', measurementId))
    }

    return MongoMeasurementToMeasurementAdapter.make(mongoMeasurement)
  }
}

export default MongoMeasurementStore

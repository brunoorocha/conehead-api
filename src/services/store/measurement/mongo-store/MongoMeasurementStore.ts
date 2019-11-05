import OwnableDataStore from '../../OwnableDataStore'
import { MongoMeasurement } from './MongoMeasurementSchema'
import Measurement from '../../../../models/Measurement'
import MongoMeasurementToMeasurementAdapter from './MongoMeasurementToMeasurementAdapter'
import { Types } from 'mongoose'
import { UnauthorizedObjectAccessError, UnableToRemoveObjectError, ObjectNotFoundError } from '../../../../models/errors/DataStoreErrors'

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

  public get = async (measurementId: string, ownerId: string): Promise<Measurement> => {
    const measurement = await this.findMeasurementForOwner(measurementId, ownerId)
    return measurement
  }

  public remove = async (measurementId: string, ownerId: string): Promise<Measurement> => {
    const measurement = await this.findMeasurementForOwner(measurementId, ownerId)
    MongoMeasurement.deleteOne({ _id: measurement.id }, error => {
      if (error) {
        return Promise.reject(new UnableToRemoveObjectError(error))
      }
    })

    return measurement
  }

  private async findMeasurementForOwner (measurementId: string, ownerId: string): Promise<Measurement> {
    const mongoMeasurement = await MongoMeasurement.findById(measurementId)

    if (!mongoMeasurement) {
      return Promise.reject(new ObjectNotFoundError('Measure', measurementId))
    }

    const mongoMeasurementOwnerId = Types.ObjectId(mongoMeasurement.owner)
    if (!mongoMeasurementOwnerId.equals(ownerId)) {
      return Promise.reject(new UnauthorizedObjectAccessError())
    }

    return MongoMeasurementToMeasurementAdapter.make(mongoMeasurement)
  }
}

export default MongoMeasurementStore

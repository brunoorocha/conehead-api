import OwnableDataStore from '../services/store/OwnableDataStore'
import Measurement from '../models/Measurement'
import MongoMeasurementStore from '../services/store/measurement/mongo-store/MongoMeasurementStore'
import CreateMeasurement from '../workers/measurement/CreateMeasurement'
import ListMeasurements from '../workers/measurement/ListMeasurements'
import GetMeasurementWithId from '../workers/measurement/GetMeasurementWithId'
import RemoveMeasurementWithId from '../workers/measurement/RemoveMeasurementWithId'
import RequestValidationCheckWorker, { ResponseError } from '../workers/RequestValidationCheck'
import { Request, Response } from 'express'
import User from '../models/User'

class MeasurementController {
  public measurementStore: OwnableDataStore<Measurement>

  public constructor (measurementStore: OwnableDataStore<Measurement> = new MongoMeasurementStore()) {
    this.measurementStore = measurementStore
  }

  public store = async (req: Request, res: Response): Promise<Response> => {
    try {
      await RequestValidationCheckWorker(req)
      const user = req.user as User
      const name: string = req.body.name
      const abbreviation: string = req.body.abbreviation
      const measurement = await CreateMeasurement(name, abbreviation, user.id, this.measurementStore)
      return res.json(measurement)
    } catch (error) {
      if ((error as ResponseError).status) {
        return res.status(error.status).json({ errors: error.errors })
      }

      return res.status(500).json({ error: error.message })
    }
  }

  public index = async (req: Request, res: Response): Promise<Response> => {
    const user = req.user as User
    const measurements = await ListMeasurements(user.id, this.measurementStore)
    return res.json(measurements)
  }

  public get = async (req: Request, res: Response): Promise<Response> => {
    try {
      await RequestValidationCheckWorker(req)
      const user = req.user as User
      const measurementId: string = req.params.measurementId
      const measurement = await GetMeasurementWithId(measurementId, user.id, this.measurementStore)
      return res.json(measurement)
    } catch (error) {
      if ((error as ResponseError).status) {
        return res.status(error.status).json({ errors: error.errors })
      }

      return res.status(500).json({ error: error.message })
    }
  }

  public remove = async (req: Request, res: Response): Promise<Response> => {
    try {
      await RequestValidationCheckWorker(req)
      const user = req.user as User
      const measurementId: string = req.params.measurementId
      const removedMeasurement = await RemoveMeasurementWithId(measurementId, user.id, this.measurementStore)
      return res.json(removedMeasurement)
    } catch (error) {
      if ((error as ResponseError).status) {
        return res.status(error.status).json({ errors: error.errors })
      }

      return res.status(500).json({ error: error.message })
    }
  }
}

export default new MeasurementController()

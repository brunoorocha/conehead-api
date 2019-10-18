import Store from '../services/store/Store'
import Measurement from '../models/Measurement'
import MongoMeasurementStore from '../services/store/measurement/mongo-store/MongoMeasurementStore'
import CreateMeasurement from '../workers/measurement/CreateMeasurement'
import ListMeasurements from '../workers/measurement/ListMeasurements'
import GetMeasurementWithId from '../workers/measurement/GetMeasurementWithId'
import RemoveMeasurementWithId from '../workers/measurement/RemoveMeasurementWithId'
import RequestValidationCheckWorker, { ResponseError } from '../workers/requestValidationCheck'
import { Request, Response } from 'express'

class MeasurementController {
  public measurementStore: Store<Measurement>

  public constructor (measurementStore: Store<Measurement> = new MongoMeasurementStore()) {
    this.measurementStore = measurementStore
  }

  public store = async (req: Request, res: Response): Promise<Response> => {
    try {
      await RequestValidationCheckWorker(req)
      const name: string = req.body.name
      const abbreviation: string = req.body.abbreviation
      const measurement = await CreateMeasurement(name, abbreviation, this.measurementStore)
      return res.json(measurement)
    } catch (error) {
      if ((error as ResponseError).status) {
        return res.status(error.status).json({ errors: error.errors })
      }

      return res.status(500).json({ error })
    }
  }

  public index = async (req: Request, res: Response): Promise<Response> => {
    const measurements = await ListMeasurements(this.measurementStore)
    return res.json(measurements)
  }

  public get = async (req: Request, res: Response): Promise<Response> => {
    try {
      await RequestValidationCheckWorker(req)
      const measurementId: string = req.params.measurementId
      const measurement = await GetMeasurementWithId(measurementId, this.measurementStore)
      return res.json(measurement)
    } catch (error) {
      if ((error as ResponseError).status) {
        return res.status(error.status).json({ errors: error.errors })
      }

      return res.status(500).json({ error })
    }
  }

  public remove = async (req: Request, res: Response): Promise<Response> => {
    try {
      await RequestValidationCheckWorker(req)
      const measurementId: string = req.params.measurementId
      const removedMeasurement = await RemoveMeasurementWithId(measurementId, this.measurementStore)
      return res.json(removedMeasurement)
    } catch (error) {
      if ((error as ResponseError).status) {
        return res.status(error.status).json({ errors: error.errors })
      }

      return res.status(500).json({ error })
    }
  }
}

export default new MeasurementController()

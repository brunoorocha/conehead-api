import { Request, Response } from 'express'
import Store from '../services/store/Store'
import MongoMeasurementStore from '../services/store/measurement/mongo-store/MongoMeasurementStore'
import CreateMeasurement from '../workers/measurement/CreateMeasurement'
import ListMeasurements from '../workers/measurement/ListMeasurements'
import GetMeasurementWithId from '../workers/measurement/GetMeasurementWithId'
import RemoveMeasurementWithId from '../workers/measurement/RemoveMeasurementWithId'
import RequestValidationCheckWorker from '../workers/RequestValidationCheck'
import ErrorHandlingWorker from '../workers/error-handler/ErrorHandler'
import Measurement from '../models/Measurement'

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
      return res.status(201).json(measurement)
    } catch (error) {
      return ErrorHandlingWorker(res, error)
    }
  }

  public index = async (req: Request, res: Response): Promise<Response> => {
    try {
      const measurements = await ListMeasurements(this.measurementStore)
      return res.json(measurements)
    } catch (error) {
      return ErrorHandlingWorker(res, error)
    }
  }

  public get = async (req: Request, res: Response): Promise<Response> => {
    try {
      await RequestValidationCheckWorker(req)
      const measurementId: string = req.params.measurementId
      const measurement = await GetMeasurementWithId(measurementId, this.measurementStore)
      return res.json(measurement)
    } catch (error) {
      return ErrorHandlingWorker(res, error)
    }
  }

  public remove = async (req: Request, res: Response): Promise<Response> => {
    try {
      await RequestValidationCheckWorker(req)
      const measurementId: string = req.params.measurementId
      const removedMeasurement = await RemoveMeasurementWithId(measurementId, this.measurementStore)
      return res.json(removedMeasurement)
    } catch (error) {
      return ErrorHandlingWorker(res, error)
    }
  }
}

export default new MeasurementController()

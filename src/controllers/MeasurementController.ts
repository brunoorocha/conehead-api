import Store from '../services/store/Store'
import Measurement from '../models/Measurement'
import MongoMeasurementStore from '../services/store/measurement/mongo-store/MongoMeasurementStore'
import CreateMeasurement from '../workers/measurement/CreateMeasurement'
import ListMeasurements from '../workers/measurement/ListMeasurements'
import { Request, Response } from 'express'

class MeasurementController {
  public measurementStore: Store<Measurement>

  public constructor (measurementStore: Store<Measurement> = new MongoMeasurementStore()) {
    this.measurementStore = measurementStore
  }

  public store = async (req: Request, res: Response): Promise<Response> => {
    const name: string = req.body.name
    const measurement = await CreateMeasurement(name, this.measurementStore)
    return res.json(measurement)
  }

  public index = async (req: Request, res: Response): Promise<Response> => {
    const measurements = await ListMeasurements(this.measurementStore)
    return res.json(measurements)
  }
}

export default new MeasurementController()

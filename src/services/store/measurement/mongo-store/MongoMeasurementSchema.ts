import { Document, Schema, Model, model } from 'mongoose'

export interface MongoMeasurementInterface extends Document {
  name: string;
}

const MongoMeasurementSchema = new Schema({
  name: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

export const MongoMeasurement: Model<MongoMeasurementInterface> = model<MongoMeasurementInterface>('Measurement', MongoMeasurementSchema)

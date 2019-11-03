import { Document, Schema, Model, model } from 'mongoose'

export interface MongoMeasurementInterface extends Document {
  name: string;
  abbreviation: string;
  owner: string;
}

const MongoMeasurementSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  abbreviation: {
    type: String,
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
})

export const MongoMeasurement: Model<MongoMeasurementInterface> = model<MongoMeasurementInterface>('Measurement', MongoMeasurementSchema)

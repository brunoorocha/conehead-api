import { Document, Schema, Model, model } from 'mongoose'
import { MongoMeasurementInterface } from '../../measurement/mongo-store/MongoMeasurementSchema'

export interface MongoProductInterface extends Document {
  name: string;
  barcode?: string;
  measurement: string | MongoMeasurementInterface;
}

const MongoProductSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  barcode: {
    type: String,
    required: false
  },
  measurement: {
    type: Schema.Types.ObjectId,
    ref: 'Measurement'
  }
}, {
  timestamps: true
})

export const MongoProduct: Model<MongoProductInterface> = model<MongoProductInterface>('Product', MongoProductSchema)

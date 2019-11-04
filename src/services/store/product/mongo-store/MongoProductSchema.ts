import { Document, Schema, Model, model } from 'mongoose'
import { MongoMeasurementInterface } from '../../measurement/mongo-store/MongoMeasurementSchema'

export interface MongoProductInterface extends Document {
  name: string;
  barcode?: string;
  measurement: string | MongoMeasurementInterface;
  owner: string;
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
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
})

export const MongoProduct: Model<MongoProductInterface> = model<MongoProductInterface>('Product', MongoProductSchema)

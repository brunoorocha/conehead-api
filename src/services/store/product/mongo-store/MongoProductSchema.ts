import { Document, Schema, Model, model } from 'mongoose'

export interface MongoProductInterface extends Document {
  name: string;
  barcode?: string;
}

const MongoProductSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  barcode: {
    type: String,
    required: false
  }
}, {
  timestamps: true
})

export const MongoProduct: Model<MongoProductInterface> = model<MongoProductInterface>('Product', MongoProductSchema)

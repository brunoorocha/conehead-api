import { Document, Schema, Model, model } from 'mongoose'

export interface MoongoProductInterface extends Document {
  name: string;
  barcode?: string;
}

const ProductSchema = new Schema({
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

export const MongoProduct: Model<MoongoProductInterface> = model<MoongoProductInterface>('Product', ProductSchema)

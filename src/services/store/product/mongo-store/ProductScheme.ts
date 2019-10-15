import { Document, Schema, Model, model } from 'mongoose'

export interface MoongoProductInterface extends Document {
  name: string;
}

const ProductSchema = new Schema({
  name: String
}, {
  timestamps: true
})

export const MongoProduct: Model<MoongoProductInterface> = model<MoongoProductInterface>('Product', ProductSchema)

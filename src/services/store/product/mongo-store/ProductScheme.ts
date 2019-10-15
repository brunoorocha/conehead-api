import { Document, Schema, Model, model } from 'mongoose'

export interface ProductSchemaInterface extends Document {
  name: string;
}

const ProductSchema = new Schema({
  name: String
}, {
  timestamps: true
})

export const MongoProduct: Model<ProductSchemaInterface> = model<ProductSchemaInterface>('Product', ProductSchema)

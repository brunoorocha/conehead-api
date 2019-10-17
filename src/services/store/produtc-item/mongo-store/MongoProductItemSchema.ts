import { Document, Schema, Model, model } from 'mongoose'
import { MongoProductInterface } from '../../product/mongo-store/MongoProductSchema'

export interface MongoProductItemInterface extends Document {
  quantity: number;
  price: number;
  expiration: Date;
  createdAt: Date;
  product: string | MongoProductInterface;
}

const MongoProductSchema = new Schema({
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  expiration: {
    type: Date,
    required: true
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }
}, {
  timestamps: true
})

export const MongoProductItem: Model<MongoProductItemInterface> = model<MongoProductItemInterface>('ProductItem', MongoProductSchema)

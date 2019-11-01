import { Document, Schema, Model, model } from 'mongoose'

export interface MongoUserInterface extends Document {
  name: string;
  email: string;
  hash: string;
  salt: string;
}

const MongoUserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  hash: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  }
})

export const MongoUser: Model<MongoUserInterface> = model<MongoUserInterface>('User', MongoUserSchema)

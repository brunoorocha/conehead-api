import { Document, Schema, Model, model } from 'mongoose'

export interface MongoUserInterface extends Document {
  name: string;
  email: string;
  password: string;
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
  password: {
    type: String,
    required: true
  }
})

export const MongoUser: Model<MongoUserInterface> = model<MongoUserInterface>('User', MongoUserSchema)

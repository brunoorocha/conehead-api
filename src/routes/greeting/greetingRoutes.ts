import express from 'express'

const greetingRoutes = express.Router()
greetingRoutes.get('/', (_, res) => {
  return res.json({ gretting: 'Welcome to Conehead API 🧙🏼‍♂️' })
})

export default greetingRoutes

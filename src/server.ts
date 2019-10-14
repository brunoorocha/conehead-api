import app from './application/app'

const port = process.env.PORT || 3333
app.listen(port)
console.log('Conehead API is ready!')

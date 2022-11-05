import mongoose from 'mongoose'

const connectDatabase = async () =>{
  console.log("Wait conection to the database")
  try {
    await mongoose.connect( process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
 
    console.log("MongoDB Atlas connected")
  } catch (error) {
    console.error('Erro', error.message)
  }
}

export default connectDatabase
const mongoose = require('mongoose')
const uri = 

const connectDatabase = async () =>{
  console.log("Wait conection to the database")
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
 
    console.log("MongoDB Atlas connected")
  } catch (error) {
    console.error('Erro', error.message)
  }
}

module.exports = connectDatabase
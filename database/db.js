const mongoose= require('mongoose')

const url="mongodb://127.0.0.1:27017/shortrul"
const connectToDB= async()=>{
    try {
        await mongoose.connect(url)
        console.log('Connection sucessfull with database')
    } catch (error) {
      console.log('connection failed with db', error.message)  
    }
}
module.exports= connectToDB
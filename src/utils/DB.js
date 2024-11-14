import mongoose from "mongoose";

const DB = async() => {
    try {
        await mongoose.connect(process.env.DB);
        console.log('db connected ...')
      } catch (error) {
        console.log('db not connected!',error)
      }
}

export default DB
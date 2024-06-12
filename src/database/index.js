import mongoose from 'mongoose';

const connectToDB = async()=>{
    try {
        const url = process.env.DATABASE_URL;

        if (mongoose.connection.readyState !== 1) { // Check if not already connected
          await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });
          console.log("Database connected");
        } else {
          console.log("Already connected to the database");
        }
      } catch (error) {
        console.error("Database Connection Failed:", error);
        throw new Error('Database connection failed');
      }
}
export default connectToDB;
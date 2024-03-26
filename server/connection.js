

const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        const url = `mongodb://localhost:27017/myBlogApp`

        await mongoose.connect(url);

        console.log(`Connected to MongoDB`)
    } catch (err) {
        console.err(`Error connecting to mongodb:`, err)
    }
}

module.exports = connectDB;
const mongoose = require("mongoose");

const mongoConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB Connected successfully`.cyan.underline);
    } catch (error) {
        console.log(`${error.message}`.red.underline);
    }
};

module.exports = mongoConnect;

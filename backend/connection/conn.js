const mongoose = require('mongoose');

const conn = async () => {
    try {
        await mongoose.connect("mongodb+srv://vishalpukale:vishalpukale@cluster0.nidezxf.mongodb.net/");
        console.log("Connected to Mongoose");
    } catch (error) {
        console.error("Not Connected to Mongoose");
    }
};

conn();
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to MongoDB Atlas');
        const newUser = new User({
            username: 'hasib09',
            email: 'hasib@ostad.com',
            password: 'hasib1234',
        });
        return newUser.save();
    })
    .then((user) => {
        console.log('User inserted successfully:', user);
        mongoose.connection.close();
    })
    .catch((err) => {
        console.error('Error inserting user:', err);
        mongoose.connection.close();
    });

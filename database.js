const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/bookings')
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((error) => {
        console.error('Failed to connect to MongoDB:', error);
    });

const bookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    startDate: {
        type: String,
        required: true,
    },
    endDate: {
        type: String,
        required: true,
    },
    card: {
        type: String,
        required: true
    },
    expiry: {
        type: String,
        required: true
    },
    cvc: {
        type: String,
        required: true
    }
});

const bookingCollection = mongoose.model('bookingCollection', bookingSchema);
module.exports = bookingCollection;

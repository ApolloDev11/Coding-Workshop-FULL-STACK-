const express = require('express');
const ejs = require('ejs');
const collection = require('./database.js');

const app = express();

app.use(express.json());

app.set('view engine', 'ejs');

// Body parsing middleware
app.use(express.urlencoded({extended: false}));

app.use(express.static('./public'));


//Routes
app.get('/', function(req, res, next){
    res.render('index');
});

app.get('/index', function(req, res, next){
    res.render('index');
});

app.get('/booking', function(req, res, next){
    res.render('booking');
});

app.get('/checkout', function(req, res, next){
    res.render('checkout');
});

app.get('/help', function(req, res, next){
    res.render('help')
});


//Data
app.post('/booking', async (req, res) => {
    const data = {
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        card: req.body.card,
        expiry: req.body.expiry,
        cvc: req.body.cvc
    };

    // If the data is valid, insert it into the collection
    await collection.create([data]);

    res.render('index');
});

//Edit functionality
app.put('/edit/:id', async (req, res) => {
    const data = {
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        card: req.body.card,
        expiry: req.body.expiry,
        cvc: req.body.cvc
    };

    await collection.findByIdAndUpdate(req.params.id, {$set:data});
    res.setHeader('content-type', 'application/json')
    res.end(JSON.stringify({success:true}))
});

app.get('/bookings', async (req, res) => {  //This 'bookings' refers to the URL
    let results = await collection.find({});
    res.render('bookings', {booking_data: results}); //This 'bookings' refers to the file in the views folder
});

app.delete('/delete/:id', async (req, res) => {
    try {
        const bookingId = req.params.id;
        await collection.findByIdAndDelete(bookingId);
        res.json({ success: true });
    } catch (error){
        console.error('Error deleting booking:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

const mongoose = require('mongoose')
const Campground =     require('../models/campground');
const campground = require('../models/campground');
const {descriptors , places} = require('./seedHelpers')
const cities = require('./cities');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp' , {
});

const db = mongoose.connection;
db.on('error' , console.error.bind(console , "Connection Error"))
db.once("open" , () =>{
    console.log("DataBase Connected !!!");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await campground.deleteMany({});
    for(let i = 0 ; i < 50 ; i++){
        let randomcities = Math.floor(Math.random() * 1000);
        const camp = new campground({
            location: `${cities[randomcities].city} , ${cities[randomcities].state}`,
            title  : ` ${sample(descriptors)} ${sample(places)}`
        })
        await camp.save()
    }
}

seedDB();
// seedDB().then(() => {
//     mongoose.connection.close();
// })
const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground')

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '5fdb14ac48a7b26b89fe3fe8',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam excepturi voluptate minima aut, provident minus nobis nesciunt at natus nihil, libero quisquam alias modi similique debitis recusandae dicta sint reiciendis.',
            price,
            geometry: {
                "type": "Point", 
                "coordinates": [-113.1331, 47.0202] 
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dr4t3ckwn/image/upload/v1608533070/YelCamp/b4py3h7alnwjdkxpo6sh.jpg',
                    filename: 'YelCamp/b4py3h7alnwjdkxpo6sh'
                  }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})
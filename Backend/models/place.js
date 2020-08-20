const mongoose = require('mongoose');


const Schema = mongoose.Schema;

/* Since mongoose.schema is a class we use new & 
instantiate our schema*/
const placeSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    address: { type: String, required: true },
    location: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
    },/*ref property allows relation between place schema & user schema */
    creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
});

/* monggose.model returns a constructor function that takes two arg.
first is the name of the model for eg. Place & second is the schema 
instantiated.*/
module.exports = mongoose.model('Place', placeSchema);
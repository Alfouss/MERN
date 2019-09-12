const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// console.log(Schema);
//Chema of model
let ProductSchema = new Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true}
});

//Export the model
module.exports = mongoose.model('Product', ProductSchema);

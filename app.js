const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose') ;
const cors = require("cors");
const app = express();
mongoose.connect('mongodb://localhost:27017/products', {useNewUrlParser: true});
mongoose.set('useFindAndModify', false);

const product = require('./ProductsApp/Routes/product.routes')

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
   console.log("we're connected!")
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/products', product);
let port = 1234;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});

const Product = require('../Models/product.model');

//Use method find for call all Datas
exports.read = (req, res) => {
    console.log(req.body)
    Product.find(function (err, product) {
        if (err) return console.error(err);
        res.json(product);
      });
}

//Use create for save datas received
exports.create = (req, res) => {
    console.log(req)
    let product = new Product(
        {
            name: req.body.name,
            price: req.body.price
        }
    );
    product.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Product Created successfully')
    })
};

//Use update for change the datas received
exports.update = (req, res) => {
    console.log(req.body)
    Product.findOneAndUpdate({ _id: req.body.id }, {$set: req.body}, function (err, product) {
        if (err) return next(err);
        res.send('Product udpated.');
    });
};

//Use delete for remove the datas received
exports.delete = (req, res) => {
    console.log(req.body)

    Product.findOneAndDelete({ _id: req.body.id }, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var multer = require('multer');
var path = require('path');
var Product = require('../model/productScehma');
var adminAuth = require('../authenticate/adminauth');

require('../dbcon/conn');

//create images multer use
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        console.log(file)
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({ storage: storage })



//admin authenticate middleware 
const adminrole = (req, res, next) => {
    if (req.rootUser.role === "admin") {
        next();
    } else {
        alert(`only admin can access`)
        return res.status(500).json({ message: `only admin can access` })
    }
}


//Post method creating products
router.post('/product', adminAuth, adminrole, upload.single('images'), async function (req, res) {
    try {
        var imagefile = req.file.filename;
        const product = new Product({
            user: req.rootUser._id,
            product_name: req.body.product_name,
            product_price: req.body.product_price,
            product_description: req.body.product_description,
            product_image: `http://localhost:5000/uploads/${imagefile}`
            // product_image:imagefile
        })
        await product.save().then(() => {
            res.status(201).json({ message: `product created successfully` })
        }).catch(() => {
            res.status(400).json({ message: `product not created` })
        })
    } catch {
        res.status(400).json({ message: `only admin can access` })
    }
})

/* GET home page. */
//Get all products listing
router.get('/getproduct', async function (req, res) {
    const PAGE_SOZE = 8;
    const page = parseInt(req.query.page || "0");
    const total = await Product.countDocuments({});
    try {
        await Product.find().limit(PAGE_SOZE).skip(PAGE_SOZE * page).then((doc) => {
            res.status(200).json({ message: doc, totalPages: Math.ceil(total / PAGE_SOZE) })

        })
    } catch {
        res.json({ message: `product not get` })
    }
});


router.delete('/item/:_id', async (req, res) => {

    try {
        await Product.deleteOne({ _id: req.params._id }).then((item) => {
            return res.json({ message: 'deleted' })
        })
    } catch {
        return res.status(400).json({ message: `error` })
    }

})


module.exports = router;

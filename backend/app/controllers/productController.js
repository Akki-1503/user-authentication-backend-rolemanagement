const Product = require('../models/productModel')
const productsCltr = {}

productsCltr.list = async (req, res) => {
    try{
        const products = await Category.find(id)
        res.json(products)
    } catch(e) {
        res.json(e)
    }    
}

productsCltr.create = async(req, res) => {
    try{
        const body = req.body
        const product = new Product(body)
        const productDoc = await product.save()
        res.json(productDoc)
    } catch(e) {
        res.json(e)
    }
}

productsCltr.show = async(req, res) => {
    try{
        const id = req.params.id
        const product = await Product.findById(id)
        res.json(product)
    } catch(e) {
        res.json(e)
    }
}

productsCltr.update = async(req, res) => {
    try{
        const id = req.params.id
        const body = req.body
        const product = await Product.findByIdAndUpdate(id, body, {new: true, runValidators: true})
        res.json(product)
    } catch(e) {
        res.json(e)
    }
}

productsCltr.destroy = async(req, res) => {
    try{
        const id = req.params.id
        const product = await Category.findByIdAndDelete(id)
        res.json(product)
    } catch(e) {
        res.json(e)
    }
}

module.exports = productsCltr
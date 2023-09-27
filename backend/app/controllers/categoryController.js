const Category = require('../models/categoryModel')
const categoriesCltr = {}

categoriesCltr.list = async (req, res) => {
    try{
        const categories = await Category.find(id)
        res.json(categories)
    } catch(e) {
        res.json(e)
    }    
}

categoriesCltr.create = async(req, res) => {
    try{
        const body = req.body
        const category = new Category(body)
        const categoryDoc = await category.save()
        res.json(categoryDoc)
    } catch(e) {
        res.json(e)
    }
}

categoriesCltr.show = async(req, res) => {
    try{
        const id = req.params.id
        const category = await Category.findById(id)
        res.json(category)
    } catch(e) {
        res.json(e)
    }
}

categoriesCltr.update = async(req, res) => {
    try{
        const id = req.params.id
        const body = req.body
        const category = await Category.findByIdAndUpdate(id, body, {new: true, runValidators: true})
        res.json(category)
    } catch(e) {
        res.json(e)
    }
}

categoriesCltr.destroy = async(req, res) => {
    try{
        const id = req.params.id
        const category = await Category.findByIdAndDelete(id)
        res.json(category)
    } catch(e) {
        res.json(e)
    }
}

module.exports = categoriesCltr
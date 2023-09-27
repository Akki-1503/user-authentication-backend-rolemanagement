require('dotenv').config()
const express = require('express')
const cors = require('cors')
const usersCltr = require('./app/controllers/userController')
const authenticateUser = require('./app/middlewares/authenticate')
const authorizeUser = require('./app/middlewares/authorization')
const configureDB = require('./config/db')
const categoriesCltr = require('./app/controllers/categoryController')
const productsCltr = require('./app/controllers/productsontroller')
const PORT = 3421
const app = express()
app.use(express.json())
app.use(cors())
configureDB()

app.post('/api/users/register', usersCltr.register)
// app.post('/api/users/create', authenticateUser, (req, res, next) => {
//     req.permittedRoles = ['admin']
//     next()
// }, authorizeUser, usersCltr.create)
app.post('/api/users/login', usersCltr.login)
app.get('/api/users/account', authenticateUser, usersCltr.account)

app.get('/api/categories', authenticateUser,//verifying who the user is, token is present or not and put that object inside req.user then we will call next middleware function 
    (req, res, next) => { //middleware function for permittedroles for that particular route
        req.permittedRoles = ['admin', 'staff', 'user']
        next()
    }, authorizeUser, categoriesCltr.list)

app.post('/api/categories', authenticateUser, 
    (req, res, next) => {
        req.permittedRoles = ['admin']
        next()
    }, authorizeUser, categoriesCltr.create)

app.get('/api/categories/:id', authenticateUser,
    (req, res, next) => {
        req.permittedRoles = ['admin', 'staff', 'user']
        next()
    }, authorizeUser, categoriesCltr.show)

app.put('/api/categories/:id', authenticateUser,
    (req, res, next) => {
        req.permittedRoles = ['admin', 'staff']
        next()
    }, authorizeUser, categoriesCltr.update)

app.delete('/api/categories/:id', authenticateUser, 
    (req, res, next) => {
        req.permittedRoles = ['admin']
        next()
    }, authorizeUser,categoriesCltr.destroy)

    app.get('/api/products', authenticateUser,//verifying who the user is, token is present or not and put that object inside req.user then we will call next middleware function 
    (req, res, next) => { //middleware function for permittedroles for that particular route
        req.permittedRoles = ['admin', 'staff', 'user']
        next()
    }, authorizeUser, productsCltr.list)

app.post('/api/products', authenticateUser, 
    (req, res, next) => {
        req.permittedRoles = ['admin', 'staff']
        next()
    }, authorizeUser, productsCltr.create)

app.get('/api/products/:id', authenticateUser,
    (req, res, next) => {
        req.permittedRoles = ['admin', 'staff', 'user']
        next()
    }, authorizeUser, productsCltr.show)

app.put('/api/products/:id', authenticateUser,
    (req, res, next) => {
        req.permittedRoles = ['admin', 'staff']
        next()
    }, authorizeUser, productsCltr.update)

app.delete('/api/products/:id', authenticateUser, 
    (req, res, next) => {
        req.permittedRoles = ['admin']
        next()
    }, authorizeUser,productsCltr.destroy)

app.listen(PORT, () => {
    console.log('server running on port', PORT)
    console.log(process.env.JWT_SECRET)
})
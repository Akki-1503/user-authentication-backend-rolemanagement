const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const pick = require('lodash/pick')
const jwt = require('jsonwebtoken')
const usersCltr = {}

// usersCltr.register = (req,res) => {
//     //res.json(req.body)
//     const body = pick(req.body, ['username', 'email', 'password'])
//     const user = new User(body)
//     bcrypt.genSalt()
//           .then((salt) => {
//             //console.log(salt)
//             bcrypt.hash(user.password, salt)
//                   .then((hashedPassword) => {
//                     user.password = hashedPassword
//                     user.save()
//                         .then((userDoc) => {
//                          res.json(userDoc)
//                         })
//                         .catch((err) => {
//                             res.json(err)
//                         })
//                   })
//           })
// }

usersCltr.register = async(req, res) => {
    try{
        const body = req.body
        const user = new User(body)
        const userCount = await User.countDocuments()
        if(userCount == 0) {
            user.role = 'admin'
        }
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(user.password, salt)
        user.password = hashedPassword
        const userDoc = await user.save()
        res.json(userDoc)
    } catch(err) {
        res.json(err)
    }
}

// usersCltr.create = async(req, res) => {
//     try{
//         const body = req.body
//         const user = new User(body)
//         const salt = await bcrypt.genSalt()
//         const hashedPassword = await bcrypt.hash(user.password, salt)
//         user.password = hashedPassword
//         const userDoc = await user.save()
//         res.json(userDoc)
//     } catch(err) {
//         res.json(err)
//     }
// }

// usersCltr.login = (req, res) => {
//     const body = pick(req.body, ['email', 'password'])
//     User.findOne({email: body.email})
//         .then((user) => {
//             if(user) {
//                 //res.json(user)
//                 //res.json(user.password)
//                 bcrypt.compare(body.password, user.password)
//                       .then((result) => {
//                         if(result) {
//                             res.json(user)
//                         } else {
//                             res.status(404).json({errors: 'invalid username or password'})
//                         }
//                       })
//             } else {
//                 res.status(404).json({errors: 'invalid username or password'})
//             }
//         })
//         .catch((err) => {
//             res.json(err)
//         })
// }

usersCltr.login = async(req, res) => {
    const body = pick(req.body, ['email', 'password', 'role'])
    const user = await User.findOne({email: body.email})
    if(user) {
        const result = await bcrypt.compare(body.password, user.password)
        if(result) {
            //res.json(user)
            const tokenData = {
                _id: user._id,
                role: user.role
            }
            const token = jwt.sign(tokenData, process.env.JWT_SECRET)
            res.json({
                token : `Bearer ${token}`
            })
        } else{
            res.statu(404).json({error: 'invalid username or password'})
        }
    } else{
        res.status(404).json({error: 'invalid username or password'})
    }
}

usersCltr.account = async(req, res) => {
    try{
        const user = await User.findById(req.user._id)
        res.json(pick (user, ['_id', 'username', 'email']))
    } catch(e) {
        res.json(e)
    }
    //res.json({messsage: 'user info'})
}

module.exports = usersCltr 
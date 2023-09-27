const mongoose = require('mongoose')
// const configureDB = () => {
//     mongoose.connect('mongodb://127.0.0.1:27017/user-authentication-be-role-management')
//             .then(() => {
//                 console.log('connected to db')
//             })
//             .catch((err) => {
//                 console.log('error connected to db', err)
//             })
// }

const configureDB = async () => {
    try{
        const db = mongoose.connect('mongodb://127.0.0.1:27017/user-authentication-be-role-management')
        console.log('connected to db')
    } catch(err) {
        console.log('error connecting to db', err)
    }
}

module.exports = configureDB
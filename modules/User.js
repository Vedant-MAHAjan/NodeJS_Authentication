
// db schema for mongoose is defined with name of columns, datatypes, etc

const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: String,
        default: Date.now
    }
});


// model of the db is saved into User variables
// the name of the table is also User
// mongoose automatically sets "User" to be lowercased and plural 
// hence inside the collections of MongoDB Atlas, the table is saved as "users"
const User = mongoose.model('User', userSchema);

module.exports = User;
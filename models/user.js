var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var bcrypt   = require('bcrypt-nodejs');

// Define the schema for our user model
var userSchema = new Schema({
    firstName    : String,
    lastName     : String,
    local: {
        email        : String,
        password     : String,
    }
});

userSchema.index({ firstName: 'text', lastName: 'text' }, {name: 'UserNameIndex', weights: {firstName: 2, lastName: 4}});

// Methods ======================
// Generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// Checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// Create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);

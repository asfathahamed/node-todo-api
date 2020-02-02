var mongoose = require('mongoose');

var kittySchema = new mongoose.Schema({
    name: String
});
kittySchema.methods.speak = function() {
    var greeting = this.name ? 'My name is ' + this.name : 'I don\'t have a name'
    console.log(greeting)
};
module.exports = mongoose.model('Kitten', kittySchema);
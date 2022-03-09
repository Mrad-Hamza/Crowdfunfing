const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const categorySchema = new Schema({
   nameCategory: {
    type: String,
    required: true,
    minlength: [3, 'Name Category Name Minimum 3 charachters.'],
  },

}, 
);



const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
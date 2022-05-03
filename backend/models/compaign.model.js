const mongoose = require('mongoose');
const Category = require('./category.model');

const Schema = mongoose.Schema;


const compaignSchema = new Schema({
   nameCompaign: {
    type: String,
    required: true,
    minlength: [3, 'Name Compaign Name Minimum 3 charachters.'],
  },
  typeCompaign: {
      type: String,
    required: true,
    minlength: [3, 'Type Compaign Minimum 3 charachters.'],
  },
  objective: {
    type: Number,
    required: true,
    minlength: [3, 'Objective Compaign Minimum 3 charachters.'],
},

  description: {
  type: String,
  required: true,
  minlength: [3, 'Description Compaign Minimum 3 charachters.'],
},
  deadline: {
  type: Date,
  required: true,
},
Verified : {
  type: Number,
  required: true,
},
Status: {
  type: String,
  required: true,
},
cumulateAmount: {
  type: Number,
  required: true,
  minlength: [1, 'Objective Compaign Minimum 1 charachters.'],
},
img: {
  contentType: String,
  imgName:String
},


  user: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    
  category: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category"
    },
 
}, 

{
  timestamps: true,
});



const Compaign = mongoose.model('Compaign', compaignSchema);

module.exports = Compaign;
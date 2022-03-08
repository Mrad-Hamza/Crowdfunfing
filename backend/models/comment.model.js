const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
   content: {
    type: String,
    required: true,
    minlength: [4, 'Title Minimum 4 charachters.'],
  },
  
  forum:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"forum"
  }

}, {
  timestamps: true ,
});


const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
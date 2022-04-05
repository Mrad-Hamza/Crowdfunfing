const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
   email: {
    type: String,
            required: true,
            unique: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"],
  },
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
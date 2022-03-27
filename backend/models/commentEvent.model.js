const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentEventSchema = new Schema({
   content: {
    type: String,
  },
  
  event:{
    type:Schema.Types.ObjectId,
    ref:"event",
    required: true,
  }
}, 
{
  timestamps: true ,
});


const CommentEvent = mongoose.model('CommentEvent', commentEventSchema);

module.exports = CommentEvent;
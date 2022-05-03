const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentEventSchema = new Schema({

   comment: {
    type: String,
  },
  
  event:{
    type:Schema.Types.ObjectId,
    ref:"event",
   }, 
   user :{
     type:Schema.Types.ObjectId, 
     ref:"user"
   }

}, 
{
  timestamps: true ,
});


const CommentEvent = mongoose.model('CommentEvent', commentEventSchema);

module.exports = CommentEvent;
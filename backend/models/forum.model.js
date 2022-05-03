const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const forumSchema = new Schema({
   title: {
    type: String,
    required: true,
    minlength: [4, 'Title Minimum 4 charachters.'],
  },
  description: {
      type: String,
    required: true,
    
  },
  comments: [
    {
        type: Schema.Types.ObjectId,
        ref: "comment",
    },
],


},

{
  timestamps: true ,
});


const Forum = mongoose.model('Forum', forumSchema);

module.exports = Forum;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    nameEvent: {
     type: String,
     required: true,
     minlength: [3, 'Name must have minimum 3 charachters.'],
   },
   dateEvent: {
       type: Date,
     required: true,
   },
    descriptionEvent:{
       type: String,
     required: true,
     minlength: [6, 'Description must have minimum 6 charachters.'],
   },
   place:{
       type:Number,
       required: true,
   },
   eventType:{
       type:String,
       required: true,
   }
 }, {
   timestamps: true,
 });

 const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
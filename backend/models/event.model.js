const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventType = Object.freeze({
  Virtual: 'virtual',
  Real :'real'
  
});

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
   nbrplace:{
       type:Number,
       required: true,
   },
    startDate:{
      type:Date, 
    },
    endDate:{
      type:Date
    }, 
    urlEvent:{
      type:String,
    }, 
    localisation :{
      type:String
    } ,
    eventType:{
       type:String,
       required:true,
       enum: Object.values(EventType)
   }
 }, {
   timestamps: true,
 });

 const Event = mongoose.model('Event', eventSchema);
 
module.exports = Event;
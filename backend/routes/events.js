const router = require('express').Router();
let Event = require('../models/event.model');

//View all events 
router.route('/').get((req, res) => {
  Event.find()
    .then(events => res.json(events))
    .catch(err => res.status(400).json('Error: ' + err));
});

//add events 
router.route('/add').post((req, res) => {
  const nameEvent = req.body.nameEvent;
  const dateEvent = req.body.dateEvent;
  const descriptionEvent = req.body.descriptionEvent;
  const nbrplace = req.body.nbrplace;
  const urlEvent = req.body.urlEvent;
  const startDate= req.body.lien;
  const endDate= req.body.endDate;
  const localisation=req.body.localisation;
  const eventType = req.body.eventType;

  const newEvent = new Event({nameEvent,dateEvent,descriptionEvent,nbrplace,urlEvent,startDate,endDate,localisation,eventType});
  newEvent.save()
    .then(() => res.json('Event added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//get event by id 
router.route('/:id').get((req, res) => {
  Event.findById(req.params.id)
    .then(event => res.json(event))
    .catch(err => res.status(400).json('Error: ' + err));
});

//delete an event
router.route('/delete/:id').delete((req, res) => {
  Event.findByIdAndDelete(req.params.id)
    .then(() => res.json('Event deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//update event
router.route('/update/:id').put((req, res) => {
  Event.findById(req.params.id)
    .then(event => {
      event.nameEvent = req.body.nameEvent;
      event.dateEvent = req.body.dateEvent;
      event.descriptionEvent = req.body.descriptionEvent;
      event.nbrplace = req.body.nbrplace;
      event.urlEvent =req.body.urlEvent ;
      event.startDate= req.body.startDate;
      event.endDate=req.body.endDate;
      event.localisation=req.body.localisation;
      event.eventType = req.body.eventType;
      event.save()
        .then(() => res.json('Event updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;
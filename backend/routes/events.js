const router = require("express").Router();
let Event = require("../models/event.model");
const moment = require("moment");
//View all events
router.route("/").get((req, res) => {
    Event.find()
        .then((events) => res.json(events))
        .catch((err) => res.status(400).json("Error: " + err));
});

//add events
router.route("/add").post((req, res) => {
    const nameEvent = req.body.nameEvent;
    const startDateEvent = req.body.startDateEvent;
    const endDateEvent = req.body.endDateEvent;
    const descriptionEvent = req.body.descriptionEvent;
    //const nbrplace = req.body.nbrplace;
    const urlEvent = req.body.urlEvent;

    const location = req.body.location;
    const eventType = req.body.eventType;

    const newEvent = new Event({
        nameEvent,
        startDateEvent,
        endDateEvent,
        descriptionEvent,
        //nbrplace,
        urlEvent,
        location,
        eventType,
    });
    newEvent
        .save()
        .then(() => res.json("Event added!"))
        .catch((err) => res.status(400).json("Error: " + err));
});

//get event by id
router.route("/:id").get((req, res) => {
    Event.findById(req.params.id)
        .then((event) => res.json(event))
        .catch((err) => res.status(400).json("Error: " + err));
});

//delete an event
router.route("/delete/:id").delete((req, res) => {
    Event.findByIdAndDelete(req.params.id)
        .then(() => res.json("Event deleted."))
        .catch((err) => res.status(400).json("Error: " + err));
});

//update event
router.route("/update/:id").put((req, res) => {
    Event.findById(req.params.id)
        .then((event) => {
            event.nameEvent = req.body.nameEvent;
            event.startDateEvent = req.body.startDateEvent;
            event.endDateEvent = req.body.endDateEvent;
            event.descriptionEvent = req.body.descriptionEvent;
            //event.nbrplace = req.body.nbrplace;
            event.urlEvent = req.body.urlEvent;
            event.location = req.body.location;
            event.eventType = req.body.eventType;
            event
                .save()
                .then(() => res.json("Event updated!"))
                .catch((err) => res.status(400).json("Error: " + err));
        })
        .catch((err) => res.status(400).json("Error: " + err));
});

router.get("/search/:key", async (req, resp) => {
    let data = await Event.find({
        $or: [{ nameEvent: { $regex: req.params.key } }, { location: { $regex: req.params.key } }, { eventType: { $regex: req.params.key } }],
    });
    resp.send(data);
});



module.exports = router;

const router = require("express").Router();
const mongoose = require("mongoose");

let Event = require("../models/event.model");
const moment = require("moment");
const multer = require ("multer");
const { ObjectId } = require("mongodb");

const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"../public/uploads");
    },
    filename:(req,file,callback)=>{
        callback(null,file.originalname);
    }
})
const upload = multer({storage:storage})

//View all events
router.route("/").get((req, res) => {
    Event.find()
        .then((events) => res.json(events))
        .catch((err) => res.status(400).json("Error: " + err));
});

//getFavoriteList method
router.route("/favorite").get((req, res) => {
   Event.find({ status: "Interested" })
        .then((events) => res.json(events))
        .catch((err) => res.status(400).json("Error: " + err));
});

//add events

router.route("/createEvent").post(upload.single("eventImage"),(req, res) => {

    const nameEvent = req.body.nameEvent;
    const startDateEvent = req.body.startDateEvent;
    const endDateEvent = req.body.endDateEvent;
    const descriptionEvent = req.body.descriptionEvent;
    //const nbrplace = req.body.nbrplace;
    const urlEvent = req.body.urlEvent;
    const location = req.body.location;
    //const eventImage = req.body.eventImage
    const eventImage = {
        contentType: "image/png",
        imgName: req.file.originalname,
            // imgName:"logo.png"
        
    };

    // const eventImage = req.file.eventImage
    const eventType = req.body.eventType;
    const status = "NotInterested";

    const newEvent = new Event({
        nameEvent,
        startDateEvent,
        endDateEvent,
        descriptionEvent,
        //nbrplace,
        location,
        urlEvent,
        eventImage,
        eventType,
        status
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
router.route("/update/:id").put(upload.single("eventImage"),(req, res) => {
    Event.findById(req.params.id)
        .then((event) => {
            event.nameEvent = req.body.nameEvent;
            event.startDateEvent = req.body.startDateEvent;
            event.endDateEvent = req.body.endDateEvent;
            event.descriptionEvent = req.body.descriptionEvent;
            //event.nbrplace = req.body.nbrplace;
            event.urlEvent = req.body.urlEvent;
            event.location = req.body.location;
            event.eventImage = {
                contentType: "image/png",
                imgName: req.file.originalname,
                // imgName:"logo.png"
            };
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


router.post("/search/", async (req, res)  => {
    const { type, query } = req.body;
    try {
        let events; 
        switch (type) {
            case "text":
                events = await Event.find({ $text: { $search: query } });
                break;
            case "eventType":
                events = await Event.find({ $eventType: query });
                break;
            default: console.log("zefbeh");
        }
        if (!events.length > 0) {
            events = await Event.find({});
        }

        res.json({ events });
    } catch (err) {
        console.log(err, "filter Controller.searchByQueryType error");
        res.status(500).json({
            errorMessage: "Please try again later",
        });
    }
});

router.route("/commentEvent/:id/").post(async (req, res) => {
    const { id } = req.params;
    //  const objectId = new ObjectId(id);
    const comments = req.body.comments;
    const event = await Event.findById(id);
    event.comments.push(comments);
    console.log(id);
    console.log(comments);

    const updatedEvent = await Event.findByIdAndUpdate(id, event, { new: true });

    res.json(updatedEvent);
});


router.route("/:id/likeEvent").patch(async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const event = await Event.findById(id);

    const index = event.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
        event.likes.push(req.userId);
    } else {
        event.likes = event.likes.filter((id) => id !== String(req.userId));
    }

    const updatedEvent = await Event.findByIdAndUpdate(id, event, { new: true });

    res.status(200).json(updatedEvent);
});


//InterestedMethod
router.route("/interested/:id").put((req, res) => {
    Event.findById(req.params.id)
        .then((event) => {
            event.status = "Interested";
            event
                .save()
                .then(() => res.json("event in favorite List!"))
                .catch((err) => res.status(400).json("Error: " + err));
        })
        .catch((err) => res.status(400).json("Error: " + err));
});


//InterestedMethod
router.route("/notInterested/:id").put((req, res) => {
    Event.findById(req.params.id)
        .then((event) => {
            event.status = "NotInterested";
            event
                .save()
                .then(() => res.json("event Not interested In!"))
                .catch((err) => res.status(400).json("Error: " + err));
        })
        .catch((err) => res.status(400).json("Error: " + err));
});


module.exports = router;

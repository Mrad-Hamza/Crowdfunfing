const router = require("express").Router();
let Event = require("../models/event.model");

router.route("/getAll").get((req, res,next) => {
    Event.find().count()
    .then((events) => res.json(events))
        .catch((err) => next(err));
});


router.route("/inPersonEvent").get((req, res, next) => {
    Event.find({ eventType : "real"})
        .count()
        .then((events) => res.json(events))
        .catch((err) => next(err));
});

router.route("/onlineEvent").get((req, res, next) => {
    Event.find({ eventType: "virtual" })
        .count()
        .then((events) => res.json(events))
        .catch((err) => next(err));
});


router.route("/Date").get((req, res, next) => {
    Event.aggregate([{ $group: { _id: "$startDateEvent", events: { $sum: 1 } } }])
        .then((events) => res.json(events))
        .catch((err) => next(err));
});

router.route("/location").get((req, res, next) => {
    Event.aggregate([{ $group: { _id: "$location", events: { $sum: 1 } } }])
        .then((events) => res.json(events))
        .catch((err) => next(err));
});
module.exports = router;

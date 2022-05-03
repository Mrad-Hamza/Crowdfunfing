const router = require('express').Router();
const CommentEvent = require("../models/commentEvent.model");
const Event = require('../models/event.model')
const multer = require("multer");

const upload = multer({});


//retrieve all the comments
router.route('/').get((req, res) => {
    CommentEvent.find()
        .then((comments) => res.json(comments))
        .catch((err) => res.status(400).json("Error: " + err));
});


//add method
router.route("/addComment").post(upload.single(""),(req, res) => {
const comment= req.body.comment;
const user = req.body.user;
const event = req.body.event
const newCommentEvent = new CommentEvent({
  comment,
  user,
  event
    
  });
newCommentEvent
    .save()
    .then(() => res.json("Comment added!"))
    .catch((err) => res.status(400).json("Error: " + err));

});

  //retrieve the comment by id 
router.route('/:id').get((req, res) => {
    CommentEvent.findById(req.params.id)
    .then(c => res.json(c))
    .catch(err => res.status(400).json('Error: ' + err));
});

//delete comment 
router.route('/delete/:id').delete((req, res) => {
    CommentEvent.findByIdAndDelete(req.params.id)
    .then(() => res.json('Comment deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// update comment
router.route('/update/:id').put((req, res) => {
    CommentEvent.findById(req.params.id)
    .then(comm=> {
        comm.comment = req.body.comment;
        comm.save()
        .then(() => res.json('Comment updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

//getByIdEvent method
router.route("/all/:id").get((req, res) => {
    CommentEvent.find({ event: req.params.id })
        .then((events) => res.json(events))
        .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
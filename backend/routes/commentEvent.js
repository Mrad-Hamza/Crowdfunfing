const router = require('express').Router();
const CommentEvent = require('../models/commentEvent.model');

//retrieve all the comments
router.route('/').get((req, res) => {
    CommentEvent.find()
    .then(comments => res.json(comments))
    .catch(err => res.status(400).json('Error: ' + err));
});

//add comment 
router.route('/add').post((req, res) => {
    const content = req.body.content;
    const event = req.body.event;
    const newCommentEvent = new CommentEvent({content,event});
    newCommentEvent.save()
      .then(() => res.json('Comment added!'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  //retrieve the comment by id 
router.route('/:id').get((req, res) => {
    CommentEvent.findById(req.params.id)
    .then(comment => res.json(comment))
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
    .then(comment => {
        comment.content = req.body.content;
        comment.save()
        .then(() => res.json('Comment updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;
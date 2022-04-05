const router = require('express').Router();
let Comment = require('../models/comment.model');


router.route('/').get((req, res) => {
    Comment.find()
    .then(comments => res.json(comments))
    .catch(err => res.status(400).json('Error: ' + err));
// var Filter = require('bad-words');
// var filter = new Filter();
// filter.addWords('bad', 'testtest','badwords'); // Add your own words
// console.log(filter.clean(comment.content));
// var new_filter = new Filter({ placeHolder: '$' });
});

router.route('/add').post((req, res) => {
    const email = req.body.email;
  const content = req.body.content;
  const forum = req.body.forum;



  const newComment = new Comment({email,content,forum});

  newComment.save()
    .then(() => res.json('Comment added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Comment.findById(req.params.id)
    .then(comment => res.json(comment))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/:forum').get((req, res) => {
    Comment.findById(req.params.forum)
    .then(comment => res.json(comment))
    .catch(err => res.status(400).json('Error: ' + err));
});
// router.get("/commentsCounter",(req, res) => {
//   mysqlConnection.query(
//       "select * from Comments",
//       (err, results,fields)=>{
//           if(!err){
//           res.send(results);
//       }
//       else {
//           console.log(err);}
//       }
//   )
//   });

router.route('/:id').delete((req, res) => {
    Comment.findByIdAndDelete(req.params.id)
    .then(() => res.json('Comment deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').put((req, res) => {
    Comment.findById(req.params.id)
    .then(comment => {
        comment.email = req.body.email;
        comment.content = req.body.content;
       
     
        comment.save()
        .then(() => res.json('Comment updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;

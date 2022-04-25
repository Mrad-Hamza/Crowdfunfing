const router = require('express').Router();
let Comment = require('../models/comment.model');
let Forum = require('../models/forum.model');
const nodemailer = require('nodemailer');
const mysql =require('mysql');

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

  newComment
  .save()
    .then(() => res.json('Comment added!'))
    .catch(err => res.status(400).json('Error: ' + err));
    Forum.findById(forum)
    .then((forumt) => {
      forumt.comments.push(newComment);
      forumt
        .save()
        .then(() => res.json("comment added to forum"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route('/:id').get((req, res) => {
    Comment.findById(req.params.id)
    .then(comment => res.json(comment))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/hh/:forum').get((req, res) => {
    Comment.filter(req.params.forum)


    .then(comment => res.json(comment))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.get("/commentsCounter",(req, res) => {
  pool.query(
      "select * from Comments",
      (err, results,fields)=>{
          if(!err){
          res.send(results);
      }
      else {
          console.log(err);}
      }
  )
  });

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


router.route('/badmsg/:mail').post( (req,res) => {
  let mailTransporter = nodemailer.createTransport({
  service :'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth : {
    user:"fundise.noreply@gmail.com",
    pass: "HzJxDKrxS2LNwa9"
      }
  })
 
  let details = {
      from : "fundise.noreply@gmail.com",
      to : req.params.mail,
      subject : "bad msg.",
      text : "Attention you send a bad comment and it will be deleted next time y'll be blocked by the admin ! "
  }
  mailTransporter.sendMail(details)
 res.json('email sended.')
})


router.route("/cmt/:id").get((req, res) => {
    //const project = Project.findById(req.params.id);
    Comment.find({ forum: req.params.id })
        .then((forums) => res.json(forums))
        .catch((err) => res.status(400).json("Error: " + err));
});


module.exports = router;

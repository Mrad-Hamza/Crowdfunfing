const router = require('express').Router();
let Forum = require('../models/forum.model');
let Comment = require('../models/comment.model');


router.route('/').get((req, res) => {
    Forum.find()
    .then(forums => res.json(forums))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const title = req.body.title;
  const description = req.body.description;


  const newForum = new Forum({title,description});

  newForum.save()
    .then(() => res.json('Forum added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Forum.findById(req.params.id)
    .then(forum => res.json(forum))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Forum.findByIdAndDelete(req.params.id)
    .then(() => res.json('Forum deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').put((req, res) => {
    Forum.findById(req.params.id)
    .then(forum => {
        forum.title = req.body.title;
        forum.description = req.body.description;
     
      forum.save()
        .then(() => res.json('Forum updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});
router.get("/search/:key",async (req,res)=>{
    let data = await Forum.find(
        {
            "$or":[
                {title:{$regex:req.params.key}}
               
            ]
        }
    )
    res.send(data);


});

router.get("/:id/comments",async (req, res) =>{
    Comment.findAll({ where: { forum: req.params.id } }).then(
      (comment) => {
        res.render("post-template.ejs", {
          comment: comment,
        });
      }
    );
  });

  router.route("/com/:id").get((req, res) => {
    //const project = Project.findById(req.params.id);
    Comment.find({ forum: req.params.id })
        .then((forums) => res.json(forums))
        .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;

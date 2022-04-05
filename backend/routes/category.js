const router = require('express').Router();
let Category = require('../models/category.model');

router.route('/').get((req, res) => {
    Category.find()
    .then(Category => res.json(Category))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const nameCategory = req.body.nameCategory;
  

  const newCategory = new Category({nameCategory});

  newCategory.save()
    .then(() => res.json('Category added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Category.findById(req.params.id)
    .then(Category => res.json(Category))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Category.findByIdAndDelete(req.params.id)
    .then(() => res.json('Category deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').put((req, res) => {
    Category.findById(req.params.id)
    .then(category => {
        category.nameCategory= req.body.nameCompaign;
      
        category.save()
        .then(() => res.json('Category updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.get("/search/:key",async (req,res)=>{
    let data =await Category.find(
        {
            "$or":[
                {nameCategory:{$regex:req.params.key}},
            ]
        }
    )
    res.send(data);


})


module.exports = router;
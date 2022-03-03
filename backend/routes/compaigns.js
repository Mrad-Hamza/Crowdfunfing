const router = require('express').Router();
let Compaign = require('../models/compaign.model');

router.route('/').get((req, res) => {
  Compaign.find()
    .then(Compaigns => res.json(Compaigns))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const nameCompaign = req.body.nameCompaign;
  const typeCompaign = req.body.typeCompaign;
  

  const newCompaign = new Compaign({nameCompaign,typeCompaign});

  newCompaign.save()
    .then(() => res.json('Compaign added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Compaign.findById(req.params.id)
    .then(compaign => res.json(compaign))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Compaign.findByIdAndDelete(req.params.id)
    .then(() => res.json('Compaign deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').put((req, res) => {
    Compaign.findById(req.params.id)
    .then(compaign => {
        compaign.nameCompaign= req.body.nameCompaign;
        compaign.typeCompaign = req.body.typeCompaign;
      
      compaign.save()
        .then(() => res.json('Compaign updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.get("/search/:key",async (req,res)=>{
    let data =await Compaign.find(
        {
            "$or":[
                {nameCompaign:{$regex:req.params.key}},
                {typeCompaign:{$regex:req.params.key}}
            ]
        }
    )
    res.send(data);


})


module.exports = router;
const router = require('express').Router();
let Compaign = require('../models/compaign.model');
const XLSX = require('xlsx')

router.route('/').get((req, res) => {
  Compaign.find()
    .then(Compaigns => res.json(Compaigns))
    .catch(err => res.status(400).json('Error: ' + err));
});



router.route('/dedlaine').get((req, res) => {
  Compaign.find({deadline: {  $lte: '2022-04-27'} })
  .then(Compaigns => res.json(Compaigns))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/front').get((req, res) => {
  Compaign.find({ deadline: { $gte: '2022-04-27'} })
  .then(Compaigns => res.json(Compaigns))
  .catch(err => res.status(400).json('Error: ' + err));
});
  



router.route('/pdf').get((req, res) => {
    res.sendFile(`${__dirname}/result.pdf`)
  });

  router.route('/xslx').get((req, res) => {
    Compaign.find()
    Comp = res.json(Compaigns);
    
    const workSheet = XLSX.utils.json_to_sheet(comp);
    const workBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workBook, workSheet, "Compaigns")
    // Generate buffer
    XLSX.write(workBook, { bookType: 'xlsx', type: "buffer" })

    // Binary string
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" })

    XLSX.writeFile(workBook, "Data.xlsx")

  });
  

 

router.route('/add').post((req, res) => {
  const nameCompaign = req.body.nameCompaign;
  const typeCompaign = req.body.typeCompaign;
  const objective = req.body.objective;
  const description = req.body.description;
  const deadline = req.body.deadline;
  const Verified = 1;
  const Status = "EN COUR";
  const user = req.body.user;
  const category = req.body.category;
  
  

  const newCompaign = new Compaign({nameCompaign,typeCompaign,objective,description,deadline,Verified,Status,user,category});

  newCompaign.save()
    .then(() => res.json('Compaign added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Compaign.findById(req.params.id)
    .then(Compaign => res.json(Compaign))
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
        compaign.objective = req.body.objective;
        compaign.description = req.body.description;
        compaign.deadline = req.body.deadline;
        compaign.Verified = req.body.Verified;
        compaign.Status = req.body.Status;
      
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


});

const pdf = require('html-pdf');
const pdfTemplate = require('./documents');
const { dateFnsLocalizer } = require('react-big-calendar');







  router.route('/addPDF').post((req, res) => {
    pdf.create(pdfTemplate(req.body), {}).toFile('result.pdf', (err) => {
        if(err) {
            res.send(Promise.reject());
        }

        res.send(Promise.resolve());
    });
    
  });



module.exports = router;
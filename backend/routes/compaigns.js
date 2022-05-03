const router = require('express').Router();
let Compaign = require('../models/compaign.model');
const XLSX = require('xlsx')
const multer = require("multer");

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




router.route('/add').post((req, res)=> {
  const nameCompaign = req.body.nameCompaign;
  const typeCompaign = req.body.typeCompaign;
  const objective = req.body.objective;
  const description = req.body.description;
  const deadline = req.body.deadline;
  const Verified = 0;
  const Status = "EN COUR";
  const user = req.body.user;
  const cumulateAmount= 0;
  const img = {
    contentType: "image/png",
    imgName: "NoPic.png",
};



  const newCompaign = new Compaign({nameCompaign,typeCompaign,objective,description,deadline,Verified,Status,cumulateAmount,img,user});

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

router.route('/campaignUser/:key').get((req, res) => {
  CompaignUser=Compaign.find({ user: req.params.key });
  CompaignUser.find({deadline: {  $lte: '2022-04-27'} })
  .then(Compaign => res.json(Compaign))
  .catch(err => res.status(400).json('Error: ' + err));
});

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, "../src/assets/layout/images");
  },
  filename: (req, file, cb) => {
      cb(null, file.originalname);
  },
});
var upload = multer({ storage: storage });
router.route("/addCampaignImage").put(upload.single("image"), (req, res) => {
  const image = {
      contentType: "image/*",
      imgName: req.file.filename,
  };
  Compaign.findByIdAndUpdate(req.body.data).then((Compaign) => {
    Compaign.img = image;
    Compaign.save()
          .then(() => res.json("Image added to campaign haha"))
          .catch((err) => res.status(400).json("Error: " + err));
  });
});

router.route('/update/:id').put((req, res) => {
    Compaign.findById(req.params.id)
    .then((compaign )=> {
        compaign.nameCompaign= req.body.nameCompaign;
        compaign.typeCompaign = req.body.typeCompaign;
        compaign.objective = req.body.objective;
        compaign.description = req.body.description;
        compaign.deadline = req.body.deadline;
        compaign.Verified = req.body.Verified;
        compaign.Status = req.body.Status;
        compaign.cumulateAmount = req.body.cumulateAmount;

      compaign.save()
        .then(() => res.json('Compaign updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/updateAmount/:id/:number').put((req, res) => {
    console.log(req.params.id)
    Compaign.findById(req.params.id)
        .then((compaign) => {
            console.log(compaign)
            const test = Number(req.params.number)
            const test2 = Number(compaign.cumulateAmount)
            compaign.cumulateAmount = test + test2;
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

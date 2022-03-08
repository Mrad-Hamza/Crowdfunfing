const router = require('express').Router();

var fs = require('fs');
var path = require('path');
require('dotenv/config');

var multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

var upload = multer({ storage: storage });

var imgModel = require('../models/image.model');


router.get('/', (req, res) => {
    imgModel.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.json(items);
        }
    });
});

router.route('/:id').get((req, res) => {
  imgModel.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/', upload.single('image'), (req, res, next) => {

    var obj = {
        name: req.body.name,
        desc: req.body.desc,
        img: {
            data: fs.readFileSync(path.join(process.cwd() + '/uploads/' + req.file.originalname)),
            contentType: 'image/png',
            imgName:req.file.originalname
        }
    }
    const img = new imgModel(obj)
    img.save()
        .then(() => res.json('image added!'))
        .catch(err => res.status(400).json('Error: ' + err));


});

module.exports = router;

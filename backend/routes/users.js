const router = require('express').Router();
const UserRole = require('../models/role-user.model');
const multer = require('multer')
const jwt = require('jsonwebtoken')
let User = require('../models/user.model');
const nodemailer = require('nodemailer');
const {protect} = require('../middleware/authMiddleware')
const {OAuth2Client} = require('google-auth-library')
const client = new OAuth2Client("98128393533-fb736bc4b2637vn8t1028bcf0e6mv0lj.apps.googleusercontent.com")

const storage = multer.diskStorage({
  destination: (req,file,cb) => {
    cb(null,'uploads')
  },
  filename:(req,file,cb)=>{
    cb(null,file.originalname)
  }
})

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const mailAddress = req.body.mailAddress;
  const password = req.body.password;
  const roles = req.body.roles

  const newUser = new User({username,firstname,lastname,mailAddress,password,roles});

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/googlelogin' , (req,res) => {
    const idToken = req.body.tokenId
    client.verifyIdToken({idToken, audience:"98128393533-fb736bc4b2637vn8t1028bcf0e6mv0lj.apps.googleusercontent.com"})
    .then(response => {
        const {email_verified,name,email,given_name,family_name} = response.getPayload()
        if (email_verified) {
            User.findOne({'mailAddress':email}).exec((err,user) => {
                if(err) {
                    return response.status(400).json({
                        error :"User does not exist"
                    })
                }
                else {
                    if (user) {
                        const accessToken = jwt.sign(user.toJSON(), process.env.ACCES_TOKEN_SECRET,{
                            expiresIn: '20000',
                        })
                        console.log(user)
                        return res.json({accessToken : accessToken})
                    }
                    else {
                        let password= email+process.env.ACCES_TOKEN_SECRET
                        const username = name
                        const firstname = given_name;
                        const lastname = family_name;
                        const mailAddress = email;
                        const newUser = new User({username,firstname,lastname,mailAddress,password});
                        const accessToken = jwt.sign(newUser.toJSON(), process.env.ACCES_TOKEN_SECRET,{
                            expiresIn: '20000',
                        })
                        newUser.save()
                        return res.json({accessToken : accessToken})
                    }
                }
            })
        }
    })
})

router.get('/profile/:search', protect, (req,res) => {
    User.findOne({$or:[
     {'username': req.params.search},
     {'mailAddress': req.params.search}
   ]})
    .then(user => res.json(user))
})

router.route('/:id').get((req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/affectImage/:idU/:idM').put( (req,res) => {
  User.findByIdAndUpdate(req.params.idU)
    .then(user=>{
      user.img = req.params.idM
      user.save()
        .then(()=>res.json('Image added to user haha'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
})

router.route('/affectRole/:idU/:idR').put( (req,res) => {
  User.findByIdAndUpdate(req.params.idU)
    .then(user=>{
      user.roles = req.params.idR
      user.save()
        .then(()=>res.json('Role added to user haha'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
})



router.route('/:id').delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json('User deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').put((req, res) => {
  User.findById(req.params.id)
    .then(user => {
      user.username = req.body.username;
      user.firstname = req.body.firstname;
      user.lastname = req.body.lastname;
      user.mailAddress = req.body.mailAddress;
      user.password = req.body.password;
      user.save()
        .then(() => res.json('User updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/PasswordUpdate/:mail/:password').put((req,res)=>{
    User.findOne({'mailAddress':req.params.mail})
    .then(user => {
        console.log(user)
        user.password = req.params.password
        user.save()
        .then(() => res.json('User updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
})


router.route('/ForgotPassword/:mail').post( (req,res) => {
    let mailTransporter = nodemailer.createTransport({
    service :'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth : {
        user : "fundise.noreply@gmail.com",
        pass: "fundise@123"
        }
    })
    let randomCode = (Math.random() + 1).toString(36).substring(7);
    let details = {
        from : "fundise.noreply@gmail.com",
        to : req.params.mail,
        subject : "Password restoration.",
        text : "To change your password use this code : "+randomCode
    }
    mailTransporter.sendMail(details)
    res.json({code:randomCode})
})

router.route('/login').post( (req, res) => {
  User.getAuthenticated(req.body.username,req.body.mailAddress,req.body.password, function(err, user, reason) {
    if (err) throw err;
    // login was successful if we have a user
    if (user) {
        // handle login success
        const accessToken = jwt.sign(user.toJSON(), process.env.ACCES_TOKEN_SECRET,{
          expiresIn: '10000',
        })
        res.json({accessToken : accessToken})
        return;
    }
    // otherwise we can determine why we failed
    var reasons = User.failedLogin;
    switch (reason) {
        case reasons.NOT_FOUND:
            res.json("No User Found!");
        case reasons.PASSWORD_INCORRECT:
            // note: these cases are usually treated the same - don't tell
            // the user *why* the login failed, only that it did
            res.json("Invalid details");
            break;
        case reasons.MAX_ATTEMPTS:
            // send email or otherwise notify user that account is
            // temporarily locked
            res.json("You failed too many times.")
            break;
        default:
    }
});
   /*User.findOne({$or:[
     {username: req.body.username},
     {mailAddress: req.body.mailAddress}
   ]}).clone()
  .then(user => {
    if (user == null ) {
    return res.status(400).send('Cannot find user')
  }
  try {
     user.comparePassword(req.body.password, function(err, isMatch) {
        if (err) {
          res.json("Not allowed")
        }
        else {
          res.json(isMatch)
        }
    });
  } catch {
    res.status(500).send()
  }
  })*/
})

function authenticateToken(req,res,nex){
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  jwt.verify(token,process.env.ACCES_TOKEN_SECRET,(err,user) => {
    if (err) return res.sendStatus(403)
  req.user = user
  .next()
  })
}



module.exports = router;

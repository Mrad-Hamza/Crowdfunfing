const faceapi = require('face-api.js')
const router = require('express').Router();
const multer = require('multer')
const jwt = require('jsonwebtoken')
var fs = require('fs');
let User = require('../models/user.model');
const fetch = require('node-fetch')
const nodemailer = require('nodemailer');
const { protect } = require('../middleware/authMiddleware')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client("98128393533-fb736bc4b2637vn8t1028bcf0e6mv0lj.apps.googleusercontent.com")
var fs = require('fs');
var path = require('path');
require('dotenv/config');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../src/assets/layout/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

var upload = multer({ storage: storage });

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/FaceRecognition').get((req, res) => {
    faceapi.nets.ssdMobilenetv1.loadFromDisk('./weights')
})


router.route('/addUserImage').put(upload.single('image'), (req, res) => {
    const image = {
        contentType: 'image/*',
        imgName: req.file.filename
    }
    User.findByIdAndUpdate(req.body.data)
        .then(user => {
            user.img = image
            user.save()
                .then(() => res.json('Image added to user haha'))
                .catch(err => res.status(400).json('Error: ' + err));
    })
});

router.route('/add').post(upload.single('image'), (req, res) => {
    const username = req.body.username;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const mailAddress = req.body.mailAddress;
    const password = req.body.password;
    const img = {
        contentType: 'image/png',
        imgName: "NoPic.png"
    }
    var roles = req.body.roles
    if (!roles) {
        roles = 'Simple User'
    }
    const newUser = new User({ username, firstname, lastname, mailAddress, password, roles, img });

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/facebooklogin', (req, res) => {
    const { userID, accessToken } = req.body
    let urlGraphFacebook = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`
    fetch(urlGraphFacebook, {
        method: `GET`
    })
        .then(res => res.json())
        .then(response => {
            const { email, name } = response;
            User.findOne({ 'mailAddress': email }).exec((err, user) => {
                if (err) {
                    return response.status(400).json({
                        error: "User does not exist"
                    })
                } else {
                    if (user) {
                        const accessToken = jwt.sign(user.toJSON(), process.env.ACCES_TOKEN_SECRET, {
                            expiresIn: '540000',
                        })
                        return res.json({
                            accessToken: accessToken,
                            userId: user.id,
                            userName: user.username,
                            mail: user.mailAddress,
                            role: user.roles
                        })
                    }
                    else {
                        let password = email + process.env.ACCES_TOKEN_SECRET
                        const username = name
                        const firstname = name
                        const img = {
                            contentType: 'image/png',
                            imgName: "NoPic.png"
                        }
                        const lastname = name
                        const mailAddress = email;
                        const roles = 'Simple User'
                        const newUser = new User({ username, firstname, lastname, mailAddress, password, roles, img });
                        const accessToken = jwt.sign(newUser.toJSON(), process.env.ACCES_TOKEN_SECRET, {
                            expiresIn: '540000',
                        })
                        newUser.save()
                        return res.json({ accessToken: accessToken, userId: newUser.id, userName: newUser.username, mail: newUser.mailAddress, role: newUser.roles })
                    }
                }
            })
        })
})
router.post('/googlelogin', (req, res) => {
    const idToken = req.body.tokenId
    client.verifyIdToken({ idToken, audience: "98128393533-fb736bc4b2637vn8t1028bcf0e6mv0lj.apps.googleusercontent.com" })
        .then(response => {
            const { email_verified, name, email, given_name, family_name } = response.getPayload()
            if (email_verified) {
                User.findOne({ 'mailAddress': email }).exec((err, user) => {
                    if (err) {
                        return response.status(400).json({
                            error: "User does not exist"
                        })
                    }
                    else {
                        if (user) {
                            const accessToken = jwt.sign(user.toJSON(), process.env.ACCES_TOKEN_SECRET, {
                                expiresIn: '540000',
                            })
                            return res.json({ accessToken: accessToken, role: user.roles, userId: user.id, userName: user.username, mail: user.mailAddress })
                        }
                        else {
                            let password = email + process.env.ACCES_TOKEN_SECRET
                            const username = name
                            const firstname = given_name;
                            const lastname = family_name;
                            const mailAddress = email;
                            const img = {
                                contentType: 'image/png',
                                imgName: "NoPic.png"
                            }
                            const roles = 'Simple User'
                            const newUser = new User({ username, firstname, lastname, mailAddress, password, roles, img });
                            const accessToken = jwt.sign(newUser.toJSON(), process.env.ACCES_TOKEN_SECRET, {
                                expiresIn: '540000',
                            })
                            newUser.save()
                            return res.json({ accessToken: accessToken, role: newUser.roles, userId: newUser.id, userName: newUser.username, mail: newUser.mailAddress })
                        }
                    }
                })
            }
        })
})

router.get('/profile/:search', protect, (req, res) => {
    User.findOne({
        $or: [
            { 'username': req.params.search },
            { 'mailAddress': req.params.search }
        ]
    })
        .then(user => res.json(user))
})

router.get('/search/:search', (req, res) => {
    User.findOne({
        $or: [
            { 'username': req.params.search },
            { 'mailAddress': req.params.search }
        ]
    })
        .then(user => res.json(user))
})

router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/affectImage/:idU/:idM').put((req, res) => {
    User.findByIdAndUpdate(req.params.idU)
        .then(user => {
            user.img = req.params.idM
            user.save()
                .then(() => res.json('Image added to user haha'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
})

router.route('/affectRole/:idU/:idR').put((req, res) => {
    User.findByIdAndUpdate(req.params.idU)
        .then(user => {

            user.roles = req.params.idR
            user.save()
                .then(() => res.json('Role added to user haha'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
})



router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('User deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').put((req, res) => {
    User.findByIdAndUpdate(req.params.id)
        .then(user => {
            user.username = req.body.body.username;
            user.firstname = req.body.body.firstname;
            user.lastname = req.body.body.lastname;
            user.mailAddress = req.body.body.mailAddress;
            user.password = req.body.body.password;
            user.roles = req.body.body.roles;
            user.img = req.body.body.img;
            user.save()
                .then(() => res.json('User updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/PasswordUpdate/:mail/:password').put((req, res) => {
    User.findOne({ 'mailAddress': req.params.mail })
        .then(user => {
            user.password = req.params.password
            user.save()
                .then(() => res.json('User updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: "fundise.noreply@gmail.com",
            pass: "HzJxDKrxS2LNwa9"
        }
    })
    let details = {
        from: "fundise.noreply@gmail.com",
        to: req.params.mail,
        subject: "Password Changed Succesfully.",
        text: "Your new password is " + req.params.password
    }
    mailTransporter.sendMail(details)
})


router.route('/ForgotPassword/:mail').post((req, res) => {
    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: "fundise.noreply@gmail.com",
            pass: "HzJxDKrxS2LNwa9"
        }
    })
    let randomCode = (Math.random() + 1).toString(36).substring(7);
    let details = {
        from: "fundise.noreply@gmail.com",
        to: req.params.mail,
        subject: "Password restoration.",
        text: "To change your password use this code : " + randomCode
    }
    mailTransporter.sendMail(details)
    res.json({ code: randomCode })
})

router.route('/facialLogin').post((req,res) => {
    User.findOne({ 'mailAddress': req.body.email }).exec((err, user) => {
        if (err) {
            return res.status(400).json({
                error: "User does not exist"
            })
        }
        else {
            if (user) {
                const accessToken = jwt.sign(user.toJSON(), process.env.ACCES_TOKEN_SECRET, {
                    expiresIn: '540000',
                })
                return res.json({ accessToken: accessToken, role: user.roles, userId: user.id, userName: user.username, mail: user.mailAddress })
            }
        }
    })
})

router.route('/login').post((req, res) => {
    User.getAuthenticated(req.body.username, req.body.mailAddress, req.body.password, function (err, user, reason) {
        if (err) throw err;
        // login was successful if we have a user
        if (user) {
            // handle login success
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCES_TOKEN_SECRET, {
                expiresIn: '540000',
            })
            res.json({ accessToken: accessToken, userId: user.id, role: user.roles, userName: user.username, mail: user.mailAddress })
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

function authenticateToken(req, res, nex) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCES_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
            .next()
    })
}



module.exports = router;

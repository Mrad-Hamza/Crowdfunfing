const router = require('express').Router();
let UserRole = require('../models/role-user.model');

router.route('/').get((req, res) => {
  UserRole.find()
    .then(usersRole => res.json(usersRole))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const type = req.body.type;

  const newUserRole = new UserRole({type});

  newUserRole.save()
    .then(() => res.json('User Role added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  UserRole.findById(req.params.id)
    .then(userRole => res.json(userRole))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  UserRole.findByIdAndDelete(req.params.id)
    .then(() => res.json('User Role deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').put((req, res) => {
  UserRole.findById(req.params.id)
    .then(user => {
      user.type = req.body.type;
      user.save()
        .then(() => res.json('User Role updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;

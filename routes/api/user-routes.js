const router = require('express').Router();
const { User } = require('../../models');

// GET /api/users // get request selects all users from a database and sends it back as JSON
router.get('/', (req, res) => {
    // Access our User model and run .findAll() method // User model inherits functionality from Model class // .findAll() method lets us query all of the users from the user table 
    User.findAll({
        attributes: { exclude: ['password'] }
      })
      .then(dbUserData => res.json(dbUserData))
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
});

// GET /api/users/1 // only returns one user based on its req.params.id value
router.get('/:id', (req, res) => {
    // passing an argument into the .findOne() method
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
          id: req.params.id
        }
      })
        .then(dbUserData => {
          if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
          }
          res.json(dbUserData);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
});

// POST /api/users
router.post('/', (req, res) => {
    //expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
    // create method passes in key/value pairs where the keys are what we defined in the User model and values are from req.body // in SQL code would look like: INSERT INTO users (username, email, password) VALUES ("Lernantino", "lernantino@gmail.com", "password1234");
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// PUT /api/users
router.put('/:id', (req, res) => {
    //expects {username: 'Lernantino', email: 'plain@email.com', password: 'password'}

    // // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
    // update() method combines the parameters for creating data and looking up data
    User.update(req.body, {
        where: {
            id: req.params.id
        }
        })
        .then(dbUserData => {
            if (!dbUserData[0]) {
                res.status(404).json({ messsage: 'No user found with this id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    
});

// DELETE /api/users/1
router.delete('/:id', (req, res) => {
    // .destroy() method and provide some type of identifier to indicate where we would like to delete data from in the user database table
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUSerData => {
        if(!dbUSerData){
            res.status(404).json({ message: 'No user found with this id '});
            return;
        }
        res.json(dbUSerData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
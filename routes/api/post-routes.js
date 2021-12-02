const router = require('express').Router();
const { Post, User } = require('../../models');

// get all users using sequelize method findAll
router.get('/', (req, res) => {
    console.log('===================');
    Post.findAll({
        // Query configuration by customizing the attributes property
        attributes: [ 'id', 'post_url', 'title', 'created_at'],
        // JOIN to the User table using include 
        include: [
            // expressed as an array of objects
            {
                // reference model and attributes
                model: User,
                attributes: ['username']
            }
        ]

    })
    // .then
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });

});

router.get('/:id', (req, res) => {
    // retrieve the id property from the route
    Post.findOne({
        where: {
            // set the value of the id using req.params.id
            id: req.params.id
        },
        attributes: ['id', 'post_url', 'title', 'created_at'],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
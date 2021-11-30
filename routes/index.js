// collecting the packaged group of API endpoints and prefixing them with the path /api

const router = require('express').Router();

const apiRoutes = require('./api');

router.use('/api', apiRoutes);

// second router.use is so if we make a request to someplace that doesn't exist and send out a 404 error
router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;
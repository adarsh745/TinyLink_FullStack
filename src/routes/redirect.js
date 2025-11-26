// const express = require('express');
// const { handleRedirect } = require('../controllers/redirectController');

// const router = express.Router();

// // GET /:code
// router.get('/:code', handleRedirect);

// module.exports = router;
const express = require('express');
const { handleRedirect } = require('../controllers/redirectController');

const router = express.Router();

router.get('/:code', handleRedirect);

module.exports = router;

const express = require('express');
const { getHealth } = require('../controllers/healthController');

const router = express.Router();

// GET /healthz
router.get('/', getHealth);

module.exports = router;

const express = require('express');
const router = express.Router();
const { processGraphRequest } = require('../controllers/bfhl');

router.post('/', processGraphRequest);

module.exports = router;

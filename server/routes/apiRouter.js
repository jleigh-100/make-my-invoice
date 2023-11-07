const express = require('express');
const router = express.Router();

// Define API routes here
// this is just an example route that isn't being used... yet
router.get('/users', (req, res) => {
    res.send('List of users');
});

module.exports = router;

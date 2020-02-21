const express = require('express')
const router = express.Router();
const path = require('path')

router.get('/', function(req, res) {
 res.sendFile(path.join(__dirname + '/public/port/build/'));
});

router.get('/wave', (req, res) => {
	res.sendFile(path.join(__dirname + '/wave/'))
});






module.exports = router;

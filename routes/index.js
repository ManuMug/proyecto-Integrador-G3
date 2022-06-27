var express = require('express');
var router = express.Router();

var controllers = require ("../controllers/mainControllers");

/* GET home page. */
router.get('/', controllers.index);


module.exports = router;

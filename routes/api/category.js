var express = require('express');
var router = express.Router();
var controllers = require("../../controllers/api/categoryApi");
/* var upload = require('../../middlewares/multerProduct')
const authMiddleware = require('../../middlewares/authMiddleware')
const productApi = require('../../controllers/api/productsApi') */

//listado de productos
router.get('/', controllers.categoryList);

module.exports = router;
var express = require('express');
var router = express.Router();
var controllers = require("../../controllers/api/productsApi");
var upload = require('../../middlewares/multerProduct')
const authMiddleware = require('../../middlewares/authMiddleware')

//listado de productos
router.get('/', controllers.productsList);

//detalle de un producto
router.get("/:id", controllers.productDetail);

module.exports = router;
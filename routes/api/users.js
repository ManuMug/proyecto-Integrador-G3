var express = require('express');
var router = express.Router();
var controllers = require("../../controllers/api/usersApi");
/* var upload = require('../../middlewares/multerProduct')
const authMiddleware = require('../../middlewares/authMiddleware') */

//listado de productos
router.get('/', controllers.userList);

//detalle de un producto
router.get("/:id", controllers.userDetail);

module.exports = router;
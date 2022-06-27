var express = require('express');
var router = express.Router();
var controllers = require("../controllers/productsControllers");
var upload = require('../middlewares/multerProduct')
const authMiddleware = require('../middlewares/authMiddleware')

//listado de productos
router.get('/', controllers.productsList);
//formulario de creacion
router.get('/create', authMiddleware, controllers.createForm);
router.post("/create", upload.single('image'), controllers.processCreate)
//carrito de compras
router.get("/cart", authMiddleware, controllers.carrito);
//formulario de edicion
router.get('/edit/:id', authMiddleware, controllers.editForm);
router.post('/edit/:id', upload.single('image'), controllers.processEdit)
//detalle de un producto
router.get("/detail/:id", authMiddleware, controllers.productDetail);
//eliminar un producto
router.post('/delete/:id', controllers.delete)



module.exports = router;
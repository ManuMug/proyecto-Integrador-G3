var express = require('express');
var router = express.Router();
var controllers = require("../controllers/usersControllers");
var upload = require('../middlewares/multerUsers')
const registerValidator = require('../middlewares/registerValidator')
const loginValidator = require('../middlewares/loginValidator');
const guessMiddleware = require('../middlewares/guessMiddleware');
const authMiddleware = require('../middlewares/authMiddleware')

/* Formulario de Registro */
router.get("/register", guessMiddleware, controllers.registerForm);
router.post("/register", upload.single('avatar'), registerValidator, controllers.processRegister);

/* Login */
router.get("/login", guessMiddleware, controllers.loginForm);
router.post("/login", /* loginValidator, */ controllers.processLogin);

/* Perfil */
router.get("/profile", authMiddleware, controllers.profile);

/*Logout*/
router.get("/logout", controllers.logout);

/* Edición de usuario */
router.get("/edit/:id", controllers.editForm);
router.post("/edit/:id", upload.single('avatar'), controllers.processEdit);

/* Eliminación de usuario */
router.post("/delete/:id", controllers.delete);


module.exports = router;


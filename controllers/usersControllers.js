const fs = require("fs");
const path = require("path");
const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
const { validationResult, body } = require("express-validator");
const User = require("../models/Users");
const bcryptjs = require('bcryptjs')

const controllers = {
  /* Renderizado de Formulario de registro */
  registerForm: function (req, res, next) {
    res.render("users/register")
  },
  /* Logica del registro de usuario */
  processRegister: (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("users/register", {
        errors: errors.errors,
        oldData: req.body
      });
    }

    const userInDB = User.findByField('email', req.body.email)
    if (userInDB) {
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        return res.render("users/register", {
          errors: {
            email: {
              msg: 'Este email ya esta registado'
            }
          },
          oldData: req.body
        });
      }
    }

    if (req.file) {
      let newUser = {
        id: users[users.length - 1].id + 1,
        name: req.body.name,
        email: req.body.email,
        password: bcryptjs.hashSync(req.body.password, 10),
        direccion: req.body.direccion,
        avatar: req.file.filename,
      }
      users.push(newUser)
      let usersJson = JSON.stringify(users, null, " ")
      fs.writeFileSync(usersFilePath, usersJson)
      res.redirect('/users/login')
      return newUser
    } else {
      res.render('users/register')
    }
  },
  /* Renderizado de Formulario de login */
  loginForm: function (req, res, next) {
    res.render("users/login")
  },
  /* Logica del login de usuario */
  processLogin: (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("users/login", {
        errors: errors.errors,
        oldData: req.body
      });
    }

    const userToLogin = User.findByField('email', req.body.email)
    if (userToLogin) {
      let userPassword = bcryptjs.compareSync(req.body.password, userToLogin.password)
      if (userPassword) {
        //delete userToLogin.password; PARA SEGURIDAD
        req.session.userLogged = userToLogin
        if (req.body.remember) {
          console.log(req.body.remember === 'on')
          res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 200 })
        }
        return res.redirect('/users/profile')
      }
      return res.render('users/login', {
        errors: {
          password: {
            msg: 'Contraseña incorrecta'
          }
        },
        /* PARA SEGURIDAD
        errors: {
          email: {
            msg: 'Credenciales invalidas'
          }
        } */
      });
    }

    return res.render('users/login', {
      errors: {
        email: {
          msg: 'Email no registrado'
        }
      }
    })
  },
  /* Renderizado de perfil */
  profile: function (req, res) {
    res.render('users/profile', {
      user: req.session.userLogged
    })
  },
  /* Logica de logout */
  logout: function (req, res) {
    res.clearCookie('userEmail')
    req.session.destroy();
    return res.redirect('/')
  },
  /* Renderizado de formulario de edición */
  editForm: function (req, res) {
    // Aquí renderiza el formulario de edición de un usuario específico
  },
  /* Logica de edicion */
  processEdit: function (req, res) {
    // Aquí va la lógica de la edición de usuario
  },
  /* Logica de eliminacion */
  delete: (req, res) => {
    let id = req.params.id
    let user = users.find(user => user.id == id)
    let imagePath = path.join(__dirname, '../public/img/users/',)
    fs.unlink(imagePath, function (err) {
      if (err) throw err;
      console.log("Could not delete file!");
    });
    let usersUpdate = users.filter((i) => i.id != id);
    let usersUpdatedJSON = JSON.stringify(usersUpdate, null, " ");
    fs.writeFileSync(usersFilePath, usersUpdatedJSON);
    res.redirect("/");
  },
}
module.exports = controllers;
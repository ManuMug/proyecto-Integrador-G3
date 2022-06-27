const fs = require("fs");
const path = require("path");
const { validationResult, body } = require("express-validator");
const User = require("../models/Users");
const bcryptjs = require('bcryptjs')
const db = require('../database/models')

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
    db.Users.create({
      name: req.body.name,
      email: req.body.email,
      password: bcryptjs.hashSync(req.body.password, 10),
      direccion: req.body.direccion,
      avatar: req.file.filename
    })
    res.redirect("/users/login")
    
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

    db.Users.findAll()
      .then(function (users) {
        let userToLogin = users.find((i) => i.email == req.body.email)
        if (userToLogin) {
          let isOkPassword = bcryptjs.compareSync(req.body.password, userToLogin.password)
          if (isOkPassword) {
            delete userToLogin.password
            req.session.userLogged = userToLogin
            if (req.body.remember) {
              res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 200 })
            }
            return res.redirect('/users/profile')
          }
          return res.render('users/login', {
            errors: {
              password: {
                msg: 'Contraseña incorrecta'
              }
            }
          })
        }
        return res.render('users/login', {
          errors: {
            email: {
              msg: 'Email no registrado'
            }
          }
        })
      });
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
    db.Users.findByPk(req.params.id)
      .then(users => {
        res.render('users/userEdit', { users })
      })
  },
  /* Logica de edicion */
  processEdit: function (req, res) {
    db.Users.update({
      name: req.body.name,
      email: req.body.email,
      password: bcryptjs.hashSync(req.body.password, 10),
      direccion: req.body.direccion,
      avatar: req.file.filename
    }, {
      where: {
        idUser: req.params.id
      }
    })
    res.redirect('/users/profile')
  },
  /* Logica de eliminacion */
  delete: (req, res) => {
    db.Users.destroy({
      where: {
        idUser: req.params.id
      }
    })
    res.clearCookie('userEmail')
    req.session.destroy();
    return res.redirect('/')
  },
}
module.exports = controllers;
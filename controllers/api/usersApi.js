const db = require('../../database/models')

const controllers = {
  /* Renderizado de Listado de productos */
  userList: (req, res) => {
    db.Users.findAll()
      .then(products => {
        res.json({
          count: products.length,
          data: products,
          status: 200
        })
      })
      
  },

  /* Renderizado de Detalle de un producto */
  userDetail: (req, res) => {
    db.Users.findByPk(req.params.id)
      .then(products => {
        res.json({
          data: products,
          status: 200
        })
      }
      )
  },
}
module.exports = controllers;
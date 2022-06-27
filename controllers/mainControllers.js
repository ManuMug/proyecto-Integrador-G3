const db = require('../database/models')

const controllers = {
  /* Renderizado de vista home */
  index:  function(req, res, next) {
    db.Products.findAll()
      .then(products=>{
        res.render('home', { products })
      })
  },
}
module.exports = controllers;
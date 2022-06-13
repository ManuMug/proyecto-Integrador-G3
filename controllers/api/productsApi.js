const fs = require("fs");
const path = require("path");
const db = require('../../database/models')

const controllers = {
  /* Renderizado de Listado de productos */
  productsList: (req, res) => {
    db.Products.findAll()
      .then(products=>{
        res.json({ 
            data: products,
            status: 200
        })
      })
  },
  
  /* Renderizado de Detalle de un producto */
  productDetail: (req, res) => {
    db.Products.findByPk(req.params.id)
      .then(products=>{
        res.json({ 
            data: products,
            status: 200
        })
      })
  },
}
module.exports = controllers;
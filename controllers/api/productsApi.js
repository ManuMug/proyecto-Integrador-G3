const fs = require("fs");
const path = require("path");
const db = require('../../database/models')

const controllers = {
  /* Renderizado de Listado de productos */
  productsList: (req, res) => {
    db.Products.findAll()
    .then((products) => {
      /* Imprime campo detail en producto con url api */
      for (let i = 0; i < products.length; i++) {
        products[i].setDataValue(
          'detail',
          'http://localhost:3020/api/products/' + products[i].idProduct,
        )
      }

      /* Imprime url de la foto para consumir */
      for (let i = 0; i < products.length; i++) {
        products[i].setDataValue(
          'pathImg',
          'http://localhost:3020/img/products/' +
            products[i].image,
        )
      }

      res.status(200).json({
        count: products.length,
        data: products,
        status: 200,
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
  products: (req, res) => {
    db.Products.findAll().then((products) => {
      let countMens = 0
      let countWomens = 1
      /* Contador de productos por categoria */
      for (let i = 1; i < products.length; i++) {
        if (products[i].category == 'Women´s') {
          countWomens += 1
        } else {
          countMens += 1
        }
      }
      /* Imprime campo detail en producto con url api */
      for (let i = 0; i < products.length; i++) {
        products[i].setDataValue(
          'detail',
          'http://localhost:3020/api/products/products/' + products[i].idProduct,
        )
      }

      /* Imprime url de la foto para consumir */
      for (let i = 0; i < products.length; i++) {
        products[i].setDataValue(
          'pathImg',
          'http://localhost:3020/img/products/' +
            products[i].image,
        )
      }

      res.status(200).json({
        count: products.length,
        countByCategory: [
          {
            men: countMens,
          },
          {
            women: countWomens,
          },
        ],
        data: products,
        status: 200,
      })
    })
  },

}
module.exports = controllers;
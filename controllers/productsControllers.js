const fs = require("fs");
const path = require("path");
const db = require('../database/models')


const controllers = {
  /* Renderizado de Listado de productos */
  productsList: (req, res) => {
    db.Products.findAll()
      .then(products=>{
        res.render('products/products', { products })
      })
    /* const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8")); */
    
  },
  /* Renderizado de carrito de compras */
  carrito: function (req, res, next) {
    res.render("products/cart", { title: "carrito" })
  },
  /* Renderizado de Detalle de un producto */
  productDetail: (req, res) => {
    db.Products.findByPk(req.params.id)
      .then(products=>{
        res.render('products/productDetail', {products:products})
      })
  },
  /* Renderizado de Formulario de creación */
  createForm: (req, res) => {
    res.render("products/productCreate")
  },
  /* Logica de creación */
  processCreate: (req, res) => {
    db.Products.create({
      name: req.body.name,
      price: req.body.price,
      discount: req.body.discount,
      category: req.body.category,
      description: req.body.description,
      image: req.file.filename
    })
      res.redirect("/products")
  },
  /* Renderizado de Formulario de edición */
  editForm: (req,res) => {
    db.Products.findByPk(req.params.id)
      .then(products=>{
        res.render('products/productEdit', {products})
      })
  },
  /* Logica de edición */
  processEdit: (req, res) => {
    db.Products.update({
      name: req.body.name,
      price: req.body.price,
      discount: req.body.discount,
      category: req.body.category,
      description: req.body.description,
      image: req.file.filename
    },{
      where: {
        idProduct: req.params.id
      }
    })
    res.redirect('/products/detail/' + req.params.id)
  },
  /* Logica de eliminación */
  delete: (req, res) => {
    db.Products.destroy({
      where:{
        idProduct: req.params.id
      }
    })
    res.redirect('/products')
  },
}
module.exports = controllers;
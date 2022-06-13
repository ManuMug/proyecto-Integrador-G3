const fs = require("fs");
const path = require("path");
const db = require('../database/models')

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

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
    /* let id = req.params.id
    let product = products.find(product => product.id == id);
    res.render('products/productDetail', {
      product
    }) */
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
    /* if (req.file) {
      let newProduct = {
        id: products[products.length - 1].id + 1,
        name: req.body.name,
        price: req.body.price,
        discount: req.body.discount,
        category: req.body.category,
        description: req.body.description,
        image: req.file.filename
      }
      products.push(newProduct)
      let productsJson = JSON.stringify(products, null, " ")
      fs.writeFileSync(productsFilePath, productsJson)
      res.redirect('/products')
    } else {
      res.render('products/productCreate')
    } */
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
    /* let id = req.params.id
    let prodEditing = products.find(product => product.id == id)
    let image
    if (req.file != undefined) {
      image = req.file.filename
    } else {
      image = prodEditing.image
    }
    prodEditing = {
      id: prodEditing.id,
      ...req.body,
      image: image,
    };
    let prodEdited = products.map(product => {
      if (product.id == prodEditing.id) {
        return product = { ...prodEditing }
      }
      return product
    })
    fs.writeFileSync(productsFilePath, JSON.stringify(prodEdited, null, ""))
    res.redirect('/products') */
  },
  /* Logica de eliminación */
  delete: (req, res) => {
    db.Products.destroy({
      where:{
        idProduct: req.params.id
      }
    })
    res.redirect('/products')
    /* let id = req.params.id
    let product = products.find(product => product.id == id)
    console.log(product)
    let imagePath = path.join(__dirname, '../public/img/products/', product.image)
    fs.unlink(imagePath, function (err) {
      if (err) throw err;
      console.log("Could not delete file!");
    });
    let productsUpdate = products.filter((i) => i.id != id);
    let productsUpdatedJSON = JSON.stringify(productsUpdate, null, " ");
    fs.writeFileSync(productsFilePath, productsUpdatedJSON);
    res.redirect("/products"); */
  },
}
module.exports = controllers;
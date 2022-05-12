const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controllers = {
  index:  function(req, res, next) {           //agregar forEach para tarjeta de productos en ejs
    res.render('home', {products})}
}
module.exports = controllers;
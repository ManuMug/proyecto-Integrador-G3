const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controllers = {
  index:  function(req, res, next) {   
    const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'))
    res.render('home', {products})}
}
module.exports = controllers;
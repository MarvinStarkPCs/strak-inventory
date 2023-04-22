
const express = require('express')
const routesAdmin = express.Router();

  routesAdmin.get('/administrador', (req, res) => {
    res.render('login.ejs',);
  })
  module.exports = routesAdmin
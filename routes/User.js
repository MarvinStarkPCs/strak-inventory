
const express = require('express')
const routes = express.Router();

routes.get('/', (req, res) => {
    res.render('inicio.ejs',);
  });
  routes.get('/login', (req, res) => {
    res.render('login.ejs',);
    
  });
  routes.get('/registro', (req, res) => {
    res.render('register.ejs',);
    
  });
  routes.get('/restablecercontraseña', (req, res) => {
    res.render('restablecer_contrasenia.ejs',);
    
  });
  module.exports = routes
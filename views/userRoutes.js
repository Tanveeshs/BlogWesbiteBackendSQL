const express = require('express');
const Router = express.Router();
const comFun = require('../commonFunctions');

const changePassword        = require('../controllers/user/changePassword')
const login                 = require('../controllers/user/login');
const signup                = require('../controllers/user/signup');
const verifyMailToken       = require('../controllers/user/verifyMailToken');
const verifyMail            = require('../controllers/user/verifyMail');


Router.post('/login',login.login);
Router.post('/signup',signup.signup);
Router.post('/verify',verifyMail.verifyMail);
Router.get('/verify/:token',verifyMailToken.verifyMailToken);
Router.post('/changePassword',comFun.jwtAuth,changePassword.changePassword);

module.exports = Router;
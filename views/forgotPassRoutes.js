const express = require('express');
const Router = express.Router();

const genToken              = require('../controllers/forgotPassword/genToken')
const verifyPasswordToken   = require('../controllers/forgotPassword/verifyToken')
const updatePassword        = require('../controllers/forgotPassword/updPassword')

Router.post('/forgotPass/genToken',genToken.genToken);
Router.post('/forgotPass/verifyToken',verifyPasswordToken.verifyToken);
Router.post('/forgotPass/updatePassword',updatePassword.updPassword)

module.exports = Router;
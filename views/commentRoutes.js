const express = require('express');
const Router = express.Router();
const comFun = require('../commonFunctions');
const addComment            = require('../controllers/comments/addComments');
const delComment            = require('../controllers/comments/delComment');
Router.post('/addComment',comFun.jwtAuth,addComment.addComment);
Router.post('/delComment',comFun.jwtAuth,delComment.delComments);


module.exports = Router;
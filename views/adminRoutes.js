const express = require('express');
const Router = express.Router();
const comFun = require('../commonFunctions');
const getUnapprovedBlogs    = require('../controllers/admin/getUnapprovedBlogs');
const approveBlog           = require('../controllers/admin/approveBlog');

Router.post('/getUnapprovedBlogs',comFun.jwtAuth,getUnapprovedBlogs.getUnapprovedBlog)
Router.post('/approveBlog',comFun.jwtAuth,approveBlog.approveBlog);

module.exports = Router;
const express = require('express');
const Router = express.Router();
const comFun = require('../commonFunctions');

const getBlog               = require('../controllers/blog/getBlog');
const getBlogsByPage        = require('../controllers/blog/getBlogsByPage');
const likeOrDislike         = require('../controllers/blog/likeBlog');
const getMyBlogs            = require('../controllers/blog/getMyBlogs');
const getLikedBlogs         = require('../controllers/blog/getLikedBlogs');
const addBlog               = require('../controllers/blog/addBlog');
const delBlog               = require('../controllers/blog/delBlog');
const updBlog               = require('../controllers/blog/updBlog');


Router.post('/getBlog',comFun.jwtAuth,getBlog.getBlog);
Router.post('/getBlogsByPage',comFun.jwtAuth,getBlogsByPage.getBlog);
Router.post('/like',comFun.jwtAuth,likeOrDislike.likeBlog);
Router.post('/getMyBlogs',comFun.jwtAuth,getMyBlogs.getMyBlog);
Router.post('/getLikedBlogs',comFun.jwtAuth,getLikedBlogs.getLikedBlog);
Router.post('/addBlog',comFun.jwtAuth,addBlog.addBlog);
Router.post('/delBlog',comFun.jwtAuth,delBlog.delBlog);
Router.post('/updBlog',comFun.jwtAuth,updBlog.updBlog);

module.exports = Router;
    
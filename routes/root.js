module.exports = function(app, conn){
  var express = require('express');
  var router = express.Router();

  /* root */
  router.get('/', (req, res) => {
    res.render('news/index');
  });

  /*baking*/
  router.get('/baking', (req, res) => {
    res.render('news/baking');
  });

  /*comment*/
  router.get('/comment', (req, res) => {
    res.render('news/comment');
  });

  return router;
};

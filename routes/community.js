module.exports = function(app, conn, upload) {
    var express = require('express');
    var router = express.Router();
    var category = require('../lib/category.js');
  
    /* 목록 */
    router.get('/', (req, res) => {
     
    });
  
    /* 추가 */
    router.get('/add', (req, res) => {
      category.get(conn, function(categoryList) {
        res.render('news/add', {
          category: categoryList
        });
      });
    });
  
    /* Form 데이터 DB INSERT 여기 수정!!!!! */
    router.post('/add', upload.single('upload'), (req, res) => {
      var title = req.body.title;
      var category = req.body.category;
      var desc = req.body.desc;
      var author = req.body.author;
      var upload = req.file.filename;
  
      var sql = 'INSERT INTO community (`title`, `category`, `desc`, `author`, `upload`, `inserted`) VALUES(?, ?, ?, ?, ?, now())';
      conn.query(sql, [title, category, desc, author, upload], function(err, result, fields){
        if(err){
          console.log(err);
          res.status(500).send('Internal Server Error: ' + err);
        } else {
          res.redirect('/community/' + result.insertId);
        }
      });
    });
  
    /* 수정 */
    router.get('/:id/edit', (req, res) => {
      var id = req.params.id;
  
      category.get(conn, function(categoryList) {
        var sql = "SELECT a.*, c.title as `category_title` "
                  + "FROM community a "
                  + "INNER JOIN category c on a.category = c.id "
                  + "WHERE a.id=?";
  
        conn.query(sql, [id], function(err, news, fields){
          if(err){
            console.log(err);
            res.status(500).send('Internal Server Error: ' + err);
          } else {
            res.render('community/edit', {news:news[0], category: categoryList});
          }
        });
      });
    });
  
    /* Form 데이터 DB UPDATE */
    router.post('/:id/edit', upload.single('upload'), (req, res) => {
      var id = req.params.id;
      var category = req.body.category;
      var title = req.body.title;
      var desc = req.body.desc;
      var author = req.body.author;
  
      if (typeof req.file !== 'undefined') {
        var sql = 'UPDATE community SET title = ?, `category` = ?, `desc`= ?, `author` = ?, `updated` = now(), `upload` = ? WHERE id = ?;';
        var sqlParam = [title, category, desc, author, req.file.filename, id]
      } else {
        var sql = 'UPDATE community SET title = ?, `category` = ?, `desc`= ?, `author` = ?, `updated` = now() WHERE id = ?;';
        var sqlParam = [title, category, desc, author, id]
      }
  
      conn.query(sql, sqlParam, function(err, result, fields){
        if(err){
          console.log(err);
          res.status(500).send('Internal Server Error: ' + err);
        } else {
          res.redirect('/community/' + id);
        }
      });
    });
  
    /* Delete confirmation */
    router.get('/:id/delete', (req, res) => {
      var id = req.params.id;
      var sql = 'SELECT * FROM community WHERE id=?';
      conn.query(sql, [id], function(err, news, fields){
        if(err){
          console.log(err);
          res.status(500).send('Internal Server Error: ' + err);
        } else {
          res.render('community/delete', {news:news[0]});
        }
      });
    });
  
    /* DELETE DB row */
    router.post('/:id/delete', (req, res) => {
      var id = req.params.id;
  
      var sql = 'DELETE FROM community WHERE id = ?';
      conn.query(sql, [id], function(err, result, fields){
        if(err){
          console.log(err);
          res.status(500).send('Internal Server Error: ' + err);
        } else {
          res.redirect('/community/');
        }
      });
    });
  
    /* 상세보기 */
    router.get('/:id', (req, res) => {
      var id = req.params.id;
      var sql = "SELECT a.*, c.title as `category_title` "
                + "FROM community a "
                + "INNER JOIN category c on a.category = c.id "
                + "WHERE a.id=?";
  
      conn.query(sql, [id], function(err, news, fields){
        if(err){
          console.log(err);
          res.status(500).send('Internal Server Error: ' + err);
  
        } /*else {
          var commentSql = "SELECT * FROM comment WHERE community_id = ?";
          conn.query(commentSql, [id], function(err, comments, fields){
            if(err){
              console.log(err);
              res.status(500).send('Internal Server Error: ' + err);
            } */else {
              res.render('community/detail', {
                news: news[0],
                
              });
            /*}
          });*/
        }
      });
    });
  
    /* COMMENT 데이터 DB INSERT 
    router.post('/:id/comment', (req, res) => {
      var articleId = req.params.id;
      var author = req.body.author;
      var desc = req.body.desc;
      
      var sql = 'INSERT INTO comment (`article_id`, `author`, `desc`, `inserted`) VALUES(?, ?, ?, now())';
      conn.query(sql, [articleId, author, desc], function(err, result, fields){
        if(err){
          console.log(err);
          res.status(500).send('Internal Server Error: ' + err);
        } else {
          res.redirect('/news/' + articleId);
        }
      });
    });*/
  
  
    return router;
  };
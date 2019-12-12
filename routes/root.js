module.exports = function(app, conn){
  var express = require('express');
  var router = express.Router();

/* Landing page */
router.get('/', (req, res) => {
  res.render('news/landing');
});

 /*surfing*/
 router.get('/surfing', (req, res) => {
  res.render('news/surfing');
});

/*drawing*/
router.get('/drawing', (req, res) => {
  res.render('news/drawing');
});


  
  /* index */
  router.get('/index', (req, res) => {
    res.render('news/index');
  });

  /*baking*/
  router.get('/baking', (req, res) => {
    res.render('news/baking');
  });

  /*community*/
  router.get('/community', (req, res) => {
    res.render('news/community');
  });

  

  return router;
};

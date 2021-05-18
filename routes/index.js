const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
      res.render('index', {});
});

router.get('/controller/:roomid', (req, res, next) => {
    res.render('controller', {
       roomid: req.params.roomid
    });
});

module.exports = router;
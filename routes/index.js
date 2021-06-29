const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', {});
});

router.get('/controller/:roomid', (req, res) => {
  res.render('controller', {
    roomid: req.params.roomid,
  });
});

module.exports = router;

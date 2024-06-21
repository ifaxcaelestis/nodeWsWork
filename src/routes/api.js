const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ name: 'testJson', website: 'https://github.com/ifaxcaelestis/nodeWsWork' });
});

var users = [
    { name: 'tobi', email: 'tobi@learnboost.com' },
    { name: 'loki', email: 'loki@learnboost.com' },
    { name: 'jane', email: 'jane@learnboost.com' }
  ];

router.get('/users', (req, res) => {
  res.render('users', {
    users: users,
    title: "EJS example",
    header: "Some users"
  });
});

router.get('/ws', (req, res) => {
  res.render('client');
});

router.get('/socket', (req, res) => {
  res.render('io', {
    title: "Socket.io example",
    header: "Some users"
  });
});

router.post('/new', (req, res) => {
    res.status(201).json({ msg: '新的篇章，即将开始' });
});

module.exports = router;
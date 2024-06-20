const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ name: '图雀社区', website: 'https://tuture.co' });
});

var users = [
    { name: 'tobi', email: 'tobi@learnboost.com' },
    { name: 'loki', email: 'loki@learnboost.com' },
    { name: 'jane', email: 'jane@learnboost.com' }
  ];
router.get('/', (req, res) => {
    res.json({ name: '图雀社区', website: 'https://tuture.co' });
});

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

router.post('/new', (req, res) => {
    res.status(201).json({ msg: '新的篇章，即将开始' });
});

module.exports = router;
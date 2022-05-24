const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../db');

router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res) => {
  const item = db.concerts.filter((item) => item.id == req.params.id);
  res.json(item);
});

router.route('/concerts').post((req, res) => {
  const newConcert = {
    id: uuidv4(),
    performer: req.body.performer,
    text: req.body.text,
    genre: req.body.genre,
    price: req.body.price,
    day: req.body.day,
    image: req.body.image,
  };
  db.concerts.push(newConcert);
  return res.json({message: 'OK'});
})

router.route('/concerts/:id').put((req, res) => {
  const chooseConcert = db.concerts.filter((iteam) => iteam.id === req.params.id);
  const indexOf = db.concerts.indexOf(chooseConcert);
  const editedConcert = {
    ...chooseConcert,
    performer: req.body.performer,
    text: req.body.text,
    genre: req.body.genre,
    price: req.body.price,
    day: req.body.day,
    image: req.body.image,
  }
  db.concerts[indexOf] = editedConcert;
  return res.json({message: 'OK'});
})

router.route('/concerts/:id').delete((req, res) => {
  const chooseConcert = db.concerts.filter((item) => item.id === req.params.id);
  const indexOf = db.concerts.indexOf(chooseConcert);
  db.concerts.splice(indexOf, 1);
  return res.json({message: 'OK'});
})

module.exports = router;
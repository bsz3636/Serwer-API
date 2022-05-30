const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../db');

router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
  const item = db.seats.filter((item) => item.id == req.params.id);
  res.json(item);
});

router.route('/seats').post((req, res) => {
  const newSeat = {
    id: uuidv4(),
    day: req.body.day,
    seat: req.body.seat,
    client: req.body.client,
    email: req.body.email
  };
  if(db.seats.some(checkSeat => (checkSeat.day === req.body.day && checkSeat.seat === req.body.seat))) {
    return res.status(404).json({ message: "The slot is already taken..." });
  } else {
    db.seats.push(newSeat);
    req.io.emit('seatsUpdated', db.seats);
    return res.json({message: 'The booking was successful'});
  }
})

router.route('/seats/:id').put((req, res) => {
  const chooseSeat = db.seats.filter((iteam) => iteam.id === req.params.id);
  const indexOf = db.seats.indexOf(chooseSeat);
  const editedSeat = {
    ...chooseSeat,
    day: req.body.day,
    seat: req.body.seat,
    client: req.body.client,
    email: req.body.email,
  }
  db.seats[indexOf] = editedSeat;
  return res.json({message: 'OK'});
})

router.route('/seats/:id').delete((req, res) => {
  const chooseSeat = db.seats.filter((item) => item.id === req.params.id);
  const indexOf = db.seats.indexOf(chooseSeat);
  db.seats.splice(indexOf, 1);
  return res.json({message: 'OK'});
})

module.exports = router;
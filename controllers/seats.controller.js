//seats.controller.js

const Seat = require('../models/seats.model')

exports.getAll = async (req, res) => {
  try {
    res.json(await Seat.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getItem = async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);
    if(!seat) res.status(404).json({ message: 'Not found' });
    else res.json(seat);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.postItem = async (req, res) => {
  try {
    const { id, day, seat, client, email } = req.body;
      const newSeat = new Seat({ id: id, day: day, seat: seat, client: client, email: email});
    await newSeat.save();
    res.json({ message: 'OK' });
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.putItem = async (req, res) => {
  const { id, day, seat, client, email } = req.body;
  try {
    const seat = await Seat.findById(req.params.id);
    if(seat) {
      await Seat.updateOne({ _id: req.params.id }, { $set: { id: id, day: day, seat: seat, client: client, email: email }});
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);
    if(seat) {
      await Seat.deleteOne({_id: req.params.id});
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};
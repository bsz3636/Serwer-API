//concerts.controller.js

const Concert = require('../models/concerts.model')

exports.getAll = async (req, res) => {
  try {
    res.json(await Concert.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getItem = async (req, res) => {
  try {
    const concert = await Concert.findById(req.params.id);
    if(!concert) res.status(404).json({ message: 'Not found' });
    else res.json(concert);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.postItem = async (req, res) => {
  try {
    const { id, performer, genre, price, day, image } = req.body;
      const newConcert = new Concert({ id: id, performer: performer, genre: genre, price: price, day: day, image: image });
    await newConcert.save();
    res.json({ message: 'OK' });
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.putItem = async (req, res) => {
  const { id, performer, genre, price, day, image } = req.body;
  try {
    const concert = await Concert.findById(req.params.id);
    if(concert) {
      await Concert.updateOne({ _id: req.params.id }, { $set: { id: id, performer: performer, genre: genre, price: price, day: day, image: image }});
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
    const concert = await Concert.findById(req.params.id);
    if(concert) {
      await Concert.deleteOne({_id: req.params.id});
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};


//concerts/performer/:performer

exports.getPerformer = async (req, res) => {
  try {
    const performer = req.params.performer;
    const getPerformer = await Concert.find({performer: performer});
    if(!getPerformer) res.status(404).json({ message: 'Not found' });
    else res.json(getPerformer);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

//concerts/genre/:genre

exports.getGenre = async (req, res) => {
  try {
    const genre = req.params.genre;
    const getGenre = await Concert.find({genre: genre});
    if(!getGenre) res.status(404).json({ message: 'Not found' });
    else res.json(getGenre);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

//concerts/price/:price_min/:price_max

exports.getPrice = async (req, res) => {
  try {
    const priceMin = req.params.price_min;
    const priceMax = req.params.price_max;
    const concert = await Concert.find({
      price: { $gte: priceMin, $lte: priceMax },
    });
    if (!concert) res.status(404).json({ message: 'Not found' });
    else {
      res.json(concert);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

//concerts/day/:day 

exports.getDay = async (req, res) => {
  try {
    const day = req.params.day;
    const getDay = await Concert.find({day: day});
    if(!getDay) res.status(404).json({ message: 'Not found' });
    else res.json(getDay);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

const express = require('express');
const router = express.Router();
const ConcertController = require('../controllers/concert.controller');

router.get('/concerts', ConcertController.getAll);
router.get('/concerts/:id', ConcertController.getItem);
router.post('/concerts', ConcertController.postItem);
router.put('/concerts/:id', ConcertController.putItem);
router.delete('/concerts/:id', ConcertController.deleteItem);
router.get('/concerts/performer/:performer', ConcertController.getPerformer);
router.get('/concerts/genre/:genre', ConcertController.getGenre);
router.get('/concerts/price/:price_min/:price_max', ConcertController.getPrice);
router.get('/concerts/day/:day', ConcertController.getDay);

module.exports = router;
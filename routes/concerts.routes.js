const express = require('express');
const router = express.Router();
const ConcertController = require('../controllers/concert.controller');

router.get('/concerts', ConcertController.getAll);
router.get('/concerts/:id', ConcertController.getItem);
router.post('/concerts', ConcertController.postItem);
router.put('/concerts/:id', ConcertController.putItem);
router.delete('/concerts/:id', ConcertController.deleteItem);

module.exports = router;
const express = require('express');
const router = express.Router();
const SeatController = require('../controllers/seats.controller');

router.get('/seats', SeatController.getAll);
router.get('/seats/:id', SeatController.getItem);
router.post('/seats', SeatController.postItem);
router.put('/seats/:id', SeatController.putItem);
router.delete('/seats/:id', SeatController.deleteItem);

module.exports = router;
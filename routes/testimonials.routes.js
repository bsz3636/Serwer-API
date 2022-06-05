const express = require('express');
const router = express.Router();
const TestimonialController = require('../controllers/testimonials.controller');

router.get('/testimonials', TestimonialController.getAll);
router.get('/testimonials/random', TestimonialController.getRandom);
router.get('/testimonials/:id', TestimonialController.getItem);
router.post('/testimonials', TestimonialController.postItem);
router.put('/testimonials/:id', TestimonialController.putItem);
router.delete('/testimonials/:id', TestimonialController.deleteItem);

module.exports = router;
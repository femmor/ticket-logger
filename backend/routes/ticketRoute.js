const express = require('express');
const {
  getTickets,
  createTicket,
  getTicket,
} = require('../controllers/ticketController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, getTickets);
router.post('/', protect, createTicket);
router.get('/:id', protect, getTicket);

module.exports = router;

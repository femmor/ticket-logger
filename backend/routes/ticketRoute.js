const express = require('express');
const {
  getTickets,
  createTicket,
  getTicket,
  deleteTicket,
  updateTicket,
} = require('../controllers/ticketController');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

const noteRouter = require('./noteRoute');
router.use('/:ticketId/notes', noteRouter);

router.get('/', protect, getTickets);
router.post('/', protect, createTicket);
router.get('/:id', protect, getTicket);
router.delete('/:id', protect, deleteTicket);
router.put('/:id', protect, updateTicket);

module.exports = router;

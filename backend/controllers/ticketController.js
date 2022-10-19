const asyncHandler = require('express-async-handler');
const Ticket = require('../models/ticketModel');
const User = require('../models/userModel');

/**
 *
 * @desc Get user tickets
 * @route /api/tickets
 * @access Private
 *
 */

const getTickets = asyncHandler(async (req, res) => {
  // Get user with the id in JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const tickets = await Ticket.find({ user });

  res.status(200).json(tickets);
});

/**
 *
 * @desc Post ticket
 * @route /api/tickets
 * @access Private
 *
 */

const createTicket = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: 'Create new ticket',
  });
});

module.exports = {
  getTickets,
  createTicket,
};

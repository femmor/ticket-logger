const asyncHandler = require('express-async-handler');

/**
 *
 * @desc Get user tickets
 * @route /api/tickets
 * @access Private
 *
 */

const getTickets = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "Get user's tickets",
  });
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

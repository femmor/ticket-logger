const asyncHandler = require('express-async-handler');
const Ticket = require('../models/ticketModel');
const User = require('../models/userModel');

/**
 *
 * @desc Get user tickets
 * @route GET /api/tickets
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
 * @route POST /api/tickets
 * @access Private
 *
 */

const createTicket = asyncHandler(async (req, res) => {
  // Get the data in req.body
  const { product, description } = req.body;

  if (!product || !description) {
    res.status(400);
    throw new Error('Please add a product and description');
  }

  // Get user with the id in JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Create ticket
  const ticket = await Ticket.create({
    user,
    product,
    description,
    status: 'new',
  });

  res.status(201).json(ticket);
});

/**
 *
 * @desc Get single ticket
 * @route GET /api/tickets/:id
 * @access Private
 *
 */

const getTicket = asyncHandler(async (req, res) => {
  // Get user with the id in JWT
  const user = await User.findById(req.user.id);
  const id = req.params.id;

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const ticket = await Ticket.findById(id);

  if (!ticket) {
    res.status(404);
    throw new Error('Ticket not found');
  }

  // if (ticket.user.toString() !== req.user.id) {
  //   res.status(401);
  //   throw new Error('Not Authorized!');
  // }

  res.status(200).json(ticket);
});

/**
 *
 * @desc Delete single ticket
 * @route DELETE /api/tickets/:id
 * @access Private
 *
 */

const deleteTicket = asyncHandler(async (req, res) => {
  // Get user with the id in JWT
  const user = await User.findById(req.user.id);
  const id = req.params.id;

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const ticket = await Ticket.findById(id);

  if (!ticket) {
    res.status(404);
    throw new Error('Ticket not found');
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not Authorized!');
  }

  await ticket.remove();

  res.status(200).json({
    success: true,
    message: 'Ticket deleted successfully',
  });
});

/**
 *
 * @desc Update ticket
 * @route PUT /api/tickets/:id
 * @access Private
 *
 */

const updateTicket = asyncHandler(async (req, res) => {
  // Get user with the id in JWT
  const user = await User.findById(req.user.id);
  const id = req.params.id;

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const ticket = await Ticket.findById(id);

  if (!ticket) {
    res.status(404);
    throw new Error('Ticket not found');
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not Authorized!');
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json({
    updatedTicket,
    success: true,
    message: 'Ticket updated successfully',
  });
});

module.exports = {
  getTickets,
  createTicket,
  getTicket,
  deleteTicket,
  updateTicket,
};

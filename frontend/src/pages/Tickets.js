import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getTickets, reset } from '../features/tickets/ticketSlice';
import { Spinner, TicketItem } from '../components';
import { BackButton } from '../components';

const Tickets = () => {
  const { isSuccess, isError, isLoading, message, tickets } = useSelector(
    state => state.tickets
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTickets());

    if (isSuccess) {
      return () => {
        dispatch(reset());
      };
    }
  }, [dispatch, isSuccess]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <BackButton url="/" />
      <h1>Tickets</h1>
      <div className="tickets">
        <div className="ticket-headings">
          <div>Date</div>
          <div>Product</div>
          <div>Status</div>
          <div></div>
        </div>

        {tickets.map(ticket => (
          <TicketItem ticket={ticket} key={ticket._id} />
        ))}
      </div>
    </>
  );
};
export default Tickets;

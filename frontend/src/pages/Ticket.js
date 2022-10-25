import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BackButton, Spinner } from '../components';
import { getTicket, reset, closeTicket } from '../features/tickets/ticketSlice';

const Ticket = () => {
  const { ticket, isSuccess, isError, isLoading, message } = useSelector(
    state => state.tickets
  );

  const { _id, status, createdAt, description, product } = ticket;

  const dispatch = useDispatch();
  const { ticketId } = useParams();
  const navigate = useNavigate();

  // Close ticket function
  const onTicketClose = () => {
    dispatch(closeTicket(_id));
    toast.success('Ticket closed!');
    navigate('/');
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getTicket(ticketId));
    // eslint-disable-next-line
  }, [isError, message, ticketId]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h3>Something went wrong...</h3>;
  }

  return (
    <div className="ticket-page">
      <div className="ticket-header">
        <BackButton url="/tickets" />
        <h2>
          Ticket ID: {_id}
          <span className={`status status-${status}`}>{status}</span>
        </h2>
        <h3>Date Submitted: {new Date(createdAt).toLocaleString('en-US')}</h3>
        <h3>Product: {product}</h3>
        <hr />
        <div className="ticket-desc">
          <h3>Description of issue:</h3>
          <p>{description}</p>
        </div>
      </div>

      {status !== 'closed' && (
        <button className="btn btn-block btn-danger" onClick={onTicketClose}>
          Close Ticket
        </button>
      )}
    </div>
  );
};
export default Ticket;

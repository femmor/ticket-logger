import { Link } from 'react-router-dom';

const TicketItem = ({ ticket }) => {
  const { createdAt, product, status, _id } = ticket;

  return (
    <div className="ticket">
      <div>{new Date(createdAt).toLocaleString('en-US')}</div>
      <div>{product}</div>
      <div className={`status status-${status}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </div>
      <Link to={`/tickets/${_id}`}>
        <button className="btn btn-reverse btn-sm">View</button>
      </Link>
    </div>
  );
};
export default TicketItem;

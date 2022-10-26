import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import { FaPlus } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { BackButton, NoteItem, Spinner } from '../components';
import { getTicket, closeTicket } from '../features/tickets/ticketSlice';
import { getNotes, createNote, reset } from '../features/notes/noteSlice';

const customStyles = {
  content: {
    width: '600px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    position: 'relative',
  },
};

Modal.setAppElement('#root');

const Ticket = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [noteText, setNoteText] = useState('');
  const { ticket, isError, isLoading, message } = useSelector(
    state => state.tickets
  );
  const { notes, isLoading: noteIsLoading } = useSelector(state => state.notes);

  const { _id, status, createdAt, description, product } = ticket;

  const dispatch = useDispatch();
  const { ticketId } = useParams();
  const navigate = useNavigate();

  // Open and close modal
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  // Close ticket function
  const onTicketClose = () => {
    dispatch(closeTicket(_id));
    toast.success('Ticket closed!');
    navigate('/');
  };

  // create Note function
  const onNoteSubmit = e => {
    e.preventDefault();

    dispatch(
      createNote({
        noteText,
        ticketId,
      })
    );
    setNoteText('');
    closeModal();
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getTicket(ticketId));
    dispatch(getNotes(ticketId));
    // eslint-disable-next-line
  }, [isError, message, ticketId]);

  if (isLoading || noteIsLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h3>Something went wrong...</h3>;
  }

  return (
    <div className="ticket-page">
      <header className="ticket-header">
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
        {notes.length > 0 && <h2>Notes</h2>}
      </header>

      {status !== 'closed' && (
        <button className="btn" onClick={openModal}>
          <FaPlus /> Add note
        </button>
      )}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add note"
      >
        <h2>Add Note</h2>
        <button className="btn-close" onClick={closeModal}>
          <MdClose size={30} color="red" />
        </button>

        <form onSubmit={onNoteSubmit}>
          <div className="form-group">
            <textarea
              name="noteText"
              id="noteText"
              className="form-control"
              value={noteText}
              onChange={e => setNoteText(e.target.value)}
              placeholder="What do you need...?"
            ></textarea>
            <button type="submit" className="btn">
              Add Note
            </button>
          </div>
        </form>
      </Modal>

      {notes?.map(note => {
        return <NoteItem note={note} key={note._id} />;
      })}

      {status !== 'closed' && (
        <button className="btn btn-block btn-danger" onClick={onTicketClose}>
          Close Ticket
        </button>
      )}
    </div>
  );
};
export default Ticket;

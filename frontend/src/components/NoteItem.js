import { useSelector } from 'react-redux';

const NoteItem = ({ note }) => {
  const { user } = useSelector(state => state.auth);
  const { name, email } = user;
  const { isStaff, text, createdAt } = note;

  return (
    <div
      className="note"
      style={{
        backgroundColor: isStaff ? 'rgb(0,0,0,0.7)' : '#fff',
        color: isStaff ? '#fff' : '#000',
      }}
    >
      <h4>Note from {isStaff ? <span>Staff</span> : <span>{name}</span>}</h4>
      <p>{text}</p>
      <div className="note-date">
        {new Date(createdAt).toLocaleString('en-US')}
      </div>
    </div>
  );
};
export default NoteItem;

import { useState } from 'react';
import { useSelector } from 'react-redux';

const NewTicket = () => {
  const { user } = useSelector(state => state.auth);
  const [name] = useState(user.name);
  const [email] = useState(user.email);
  const [product, setProduct] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');

  const onSubmit = e => {
    e.preventDefault();
  };

  return (
    <>
      <section className="heading">
        <h1>Create new ticket</h1>
        <p>Please fill out the form below</p>
      </section>
      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Customer Name</label>
          <input
            type="text"
            name="name"
            id="name"
            className="form-control"
            value={name}
            disabled
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Customer Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="form-control"
            value={email}
            disabled
          />
        </div>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="product">Product</label>
            <select
              name="product"
              id="product"
              className="form-select"
              value={product}
              onChange={e => setProduct(e.target.value)}
            >
              <option value="" disabled>
                Select a product
              </option>
              <option value="iPhone">iPhone</option>
              <option value="Macbook Pro">Macbook Pro</option>
              <option value="iMac">iMac</option>
              <option value="iPad">iPad</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description of the issue</label>
            <textarea
              name="description"
              id="description"
              cols="30"
              rows="10"
              value={description}
              className="form-control"
              placeholder="Please type in the description of the issue."
              onChange={e => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
};

export default NewTicket;

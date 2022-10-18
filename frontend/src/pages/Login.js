import { useState } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../features/auth/authSlice';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const dispatch = useDispatch();

  const { user, isSuccess, isError, isLoading, message } = useSelector(
    state => state.auth
  );

  // Form input change
  const onChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = e => {
    e.preventDefault();

    // Check if fields are not empty
    if (!email || !password) {
      toast.error('All fields are required');
    } else {
      const userData = {
        email,
        password,
      };

      dispatch(login(userData));
    }
  };

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Please login to get support</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              placeholder="Enter email address"
              name="email"
              value={email}
              onChange={onChange}
              autoComplete="off"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              name="password"
              value={password}
              onChange={onChange}
              autoComplete="off"
              required
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block" type="submit">
              Login
            </button>
          </div>
        </form>
      </section>
    </>
  );
};
export default Login;

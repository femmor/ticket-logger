import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header, PrivateRoute } from './components';
import {
  Home,
  Login,
  NewTicket,
  NotFound,
  Register,
  Ticket,
  Tickets,
} from './pages';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <Router>
      <div className="container">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/new-ticket" element={<PrivateRoute />}>
            <Route path="/new-ticket" element={<NewTicket />} />
          </Route>
          <Route path="/tickets/:id" element={<PrivateRoute />}>
            <Route path="/tickets/:id" element={<Ticket />} />
          </Route>
          <Route path="/tickets" element={<PrivateRoute />}>
            <Route path="/tickets" element={<Tickets />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <ToastContainer position="bottom-left" autoClose={5000} />
    </Router>
  );
};

export default App;

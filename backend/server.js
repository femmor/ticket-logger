const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/connectDb');
const cors = require('cors');
const morgan = require('morgan');
const { errorHandler } = require('./middleware/errorMiddleware');

const userRoute = require('./routes/userRoute');

dotenv.config();

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

// Routes
app.use('/api/users', userRoute);

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();

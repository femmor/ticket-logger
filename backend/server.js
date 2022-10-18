const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const userRoute = require('./routes/userRoute');

dotenv.config();

const app = express();

app.use(morgan('dev'));
app.use(cors());

// Routes
app.use('/api/users', userRoute);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

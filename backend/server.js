const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

const contactRouter = require('./routes/contacts');
app.use('/api/contacts', contactRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
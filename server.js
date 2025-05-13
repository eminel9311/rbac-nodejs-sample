require('dotenv').config()

const express = require('express');
const bp = require('body-parser');
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const cors = require('cors');

const userRouter = require('./routes/userRouter')
const app = express();

const PORT = process.env.PORT || 3000;

//Connecting our database
const MONGODB_URI = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@mongodb:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}?authSource=admin`
console.log('MONGODB_URI', MONGODB_URI)
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected...');
  })

app.use(bp.json());
app.use(cookieParser());
app.use(bp.urlencoded({ extended: true }))

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Credentials']
};

app.use(cors(corsOptions));
app.use('', userRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
require('dotenv').config();
const express = require('express');
const mongoose = require('./utils/database');
const cors = require('cors');
const path = require('path');


const app = express();
const userRouter = require('./routes/userRouter');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', userRouter);


app.listen(process.env.PORT, () => {
    console.log('Servidor rulando');
});

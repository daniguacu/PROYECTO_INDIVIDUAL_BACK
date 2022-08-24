require('dotenv').config();
const express = require('express');
const mongoose = require('./utils/database');
const cors = require('cors');
const path = require('path');


const app = express();
const userRouter = require('./routes/userRouter');
const landlordRouter = require('./routes/landlordRouter');
const propertyRouter=require("./routes/propertyRouter")
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', userRouter);
app.use('/landlords', landlordRouter);
app.use('/properties', propertyRouter);




app.listen(process.env.PORT, () => {
    console.log('Servidor rulando');
});

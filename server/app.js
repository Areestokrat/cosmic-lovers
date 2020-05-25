const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Areestokrat:DaveLeeFletcher1234@areecluster-ziydv.mongodb.net/cosmicLovers?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })

const loginRouter = require('./routers/login');
const registerRouter = require('./routers/register');
const logoutRouter = require('./routers/logout');

app.use(express.json());

app.use('/login', loginRouter);
app.use('/register', registerRouter);
// app.use('/logout', logoutRouter);

app.listen(3001, () => {
  console.log(`Server running on port 3001`)
})

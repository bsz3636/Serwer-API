const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const socket = require('socket.io');
const mongoose = require('mongoose');
const helmet = require('helmet');


app.use((req, res, next) => {
  req.io = io;
  next();
});

// import routes
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);

app.use(express.static(path.join(__dirname, '/client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

// connects our backend code with the database
//mongoose.connect('mongodb+srv://Beata_K:Kundzia2009@cluster0.mnnlb0f.mongodb.net/NewWaveDB?retryWrites=true&w=majority', { useNewUrlParser: true });

const NODE_ENV = process.env.NODE_ENV;
let dbURI = '';

if(NODE_ENV === 'production') dbURI = 'mongodb+srv://${process.env.login}:${process.env.password}@cluster0.mnnlb0f.mongodb.net/NewWaveDB?retryWrites=true&w=majority';
else if(NODE_ENV === 'test') dbURI = 'mongodb://localhost:27017/NewWaveDBTest';
else dbURI = 'mongodb://localhost:27017/NewWaveDB';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

const io = socket(server);

io.on('connection', (socket) => {
  console.log('New socket!' + socket.id)
});

module.exports = server;
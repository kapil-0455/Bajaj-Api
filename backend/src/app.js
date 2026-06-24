const express = require('express');
const cors = require('cors');
const bfhlRouter = require('./routes/bfhl');
const { globalErrorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'API is running' });
});

app.use('/bfhl', bfhlRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

app.use(globalErrorHandler);

module.exports = app;

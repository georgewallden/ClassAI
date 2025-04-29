import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

// simple health-check
app.get('/health', (_, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
});
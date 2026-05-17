import express from 'express';
import cors from 'cors';
import apiRouter from './routes/api';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', apiRouter);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

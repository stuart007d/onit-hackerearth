import express from 'express';
import { conceptsApi } from './api/concepts-api';

const app = express();
const port = 3000;

app.get('/concepts', conceptsApi);

app.listen(port, () => {
  console.log(`Application is running on port ${port}.`);
});
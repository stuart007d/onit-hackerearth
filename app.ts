import express from 'express';
import { ConceptsApi } from './api/ConceptsApi';

const app = express();
const port = 3000;
const conceptsApi = new ConceptsApi();

app.get('/concepts', (request, response) => conceptsApi.handle(request, response));

app.listen(port, () => {
  console.log(`Application is running on port ${port}.`);
});
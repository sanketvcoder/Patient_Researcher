import express from 'express';
import { port } from './config/config.js';
import publicationRoute from './routes/publicationRoute.js';
const app = express();

app.use(express.json());

app.get('/publications', (req, res) => {
    res.send('List of publications');
});
app.use('/api/publications', publicationRoute);
app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
})
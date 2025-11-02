import express from 'express';
import { port } from './config/config.js';
import cors from 'cors';
import publicationRoute from './routes/publicationRoute.js';
const app = express();

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173", // or your frontend URL
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
}));

app.get('/publications', (req, res) => {
    res.send('List of publications');
});
app.use('/api/publications', publicationRoute);
app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
})
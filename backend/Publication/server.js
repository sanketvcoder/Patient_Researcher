import express from 'express';
import { port } from './config/config.js';
<<<<<<< HEAD
import cors from 'cors';
=======
>>>>>>> cb3c5f48a898813ec2351246e1594bc74b018214
import publicationRoute from './routes/publicationRoute.js';
const app = express();

app.use(express.json());
<<<<<<< HEAD
app.use(cors({
  origin: "http://localhost:5173", // or your frontend URL
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
}));
=======
>>>>>>> cb3c5f48a898813ec2351246e1594bc74b018214

app.get('/publications', (req, res) => {
    res.send('List of publications');
});
app.use('/api/publications', publicationRoute);
app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
})
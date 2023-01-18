import express from 'express';
import cors from 'cors';
import encodeRouter from "./routers/encode";
import decodeRouter from "./routers/decode";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use('/encode', encodeRouter);
app.use('/decode', decodeRouter);

app.listen(port, () => {
    console.log('We are on live on ' + port);
});
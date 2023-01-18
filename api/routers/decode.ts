import express from "express";
import {Vigenere} from "../constants";

const decodeRouter = express.Router();

decodeRouter.post('/', (req, res) => {
    res.send({
        decoded: Vigenere.Decipher(req.body.password).crypt(req.body.message)
    });
});

export default decodeRouter;
import express from "express";
import {Vigenere} from "../constants";

const encodeRouter = express.Router();

encodeRouter.post('/',(req, res) => {
    res.send({
        encoded: Vigenere.Cipher(req.body.password).crypt(req.body.message) ,
    });
});

export default encodeRouter;
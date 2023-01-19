import React, {useState} from 'react';
import axiosApi from "../../axiosApi";
import {Button, Container, Grid, TextField} from "@mui/material";
import {Decode, Encode} from "../../types";

const MainComponent = () => {
    const [message, setMessage] = useState({
        encode: '',
        decode: '',
        password: '',
    });

    const onchangeMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setMessage(prev => ({...prev, [name]: value}));
    };

    const onSendEncode = async () => {

        if (message.encode.length > 0) {
            const responseEncode = await axiosApi.post<Encode>('/encode', {
                password: message.password,
                message: message.encode,
            });

            setMessage({
                encode: '',
                password: '',
                decode: responseEncode.data.encoded,
            });

        } else {
            alert('Error, Please try again!');
        }
    };

    const onSendDecode = async () => {
        if (message.password.length > 0 && message.decode.length > 0) {

            const responseDecode = await axiosApi.post<Decode>('/decode', {
                password: message.password,
                message: message.decode,
            });

            setMessage({
                encode: responseDecode.data.decoded,
                decode: '',
                password: '',
            });

        } else {
            alert('Error, Please try again!')
        }
    };

    const submitForm = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSendEncode();
    };

    return (
        <Container maxWidth='xl'>
            <form autoComplete='off' onSubmit={submitForm}>
                <Grid container direction="column" spacing={2}>
                    <Grid item xs>
                        <TextField
                            id="encode"
                            label="Encode"
                            name="encode"
                            sx={{mr: 2}}
                            value={message.encode}
                            onChange={onchangeMessage}
                        />
                        <Button type="submit" color="primary" variant="contained">
                            Down
                        </Button>
                    </Grid>
                    <Grid item xs>
                        <TextField
                            id="password"
                            label="Password"
                            name="password"
                            value={message.password}
                            onChange={onchangeMessage}
                            required
                        />
                    </Grid>
                    <Grid item xs>
                        <TextField
                            id="decode"
                            label="Decode"
                            name="decode"
                            sx={{mr: 2}}
                            value={message.decode}
                            onChange={onchangeMessage}
                        />
                        <Button type="button" color="secondary" variant="contained" onClick={onSendDecode}>
                            Up
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default MainComponent;
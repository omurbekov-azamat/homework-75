import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {createDecode, createEncode} from "../messagesThunks";
import {selectDecoded, selectDecodeLoading, selectEncoded, selectEncodeLoading} from "../messagesSlice";
import {Container, Grid, TextField} from "@mui/material";
import ArrowCircleDownSharpIcon from '@mui/icons-material/ArrowCircleDownSharp';
import {LoadingButton} from "@mui/lab";
import {ArrowCircleUpSharp} from "@mui/icons-material";

const MessageForm = () => {
    const dispatch = useAppDispatch();
    const encoded = useAppSelector(selectEncoded);
    const decoded = useAppSelector(selectDecoded);
    const encodeLoading = useAppSelector(selectEncodeLoading);
    const decodeLoading = useAppSelector(selectDecodeLoading);

    const [message, setMessage] = useState({
        encode: '',
        decode: '',
        password: '',
    });

    useEffect(() => {
        setMessage(prev => ({
            ...prev,
            encode: decoded,
            password: '',
            decode: encoded,
        }));
    }, [encoded, decoded]);

    const onchangeMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setMessage(prev => ({...prev, [name]: value}));
    };

    const onSendEncode = async () => {
        if (message.encode.length > 0) {
            await dispatch(createEncode({
                message: message.encode,
                password: message.password,
            }));
        } else {
            alert('Error, Please try again!');
        }
    };

    const onSendDecode = async () => {
        if (message.password.length > 0 && message.decode.length > 0) {
            await dispatch(createDecode({
                password: message.password,
                message: message.decode,
            }));
        } else {
            alert('Error, Please try again!');
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
                        <LoadingButton
                            type='submit'
                            loading={encodeLoading}
                            loadingPosition='start'
                            startIcon={<ArrowCircleDownSharpIcon/>}
                            variant='contained'
                        >
                            Down
                        </LoadingButton>
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
                        <LoadingButton
                            type='button'
                            color='secondary'
                            loading={decodeLoading}
                            loadingPosition='start'
                            startIcon={<ArrowCircleUpSharp/>}
                            variant='contained'
                            onClick={onSendDecode}
                        >
                            Up
                        </LoadingButton>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default MessageForm;
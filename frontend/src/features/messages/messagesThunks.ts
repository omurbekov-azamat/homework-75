import axiosApi from "../../axiosApi";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {Decode, Encode, Message} from "../../types";

export const createEncode = createAsyncThunk<string , Message>(
    'messages/createEncode',
    async (message) => {
        const responseDecode = await axiosApi.post<Encode>('/encode', message);
        return responseDecode.data.encoded;
    }
);

export const createDecode = createAsyncThunk<string, Message>(
    'messages/createDecode',
    async (message) => {
        const responseEncode = await axiosApi.post<Decode>('/decode', message);
        return responseEncode.data.decoded;
    }
);
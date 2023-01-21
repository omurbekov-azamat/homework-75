import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {createDecode, createEncode} from "./messagesThunks";

interface MessagesState {
    encodeLoading: boolean;
    decodeLoading: boolean;
    encoded: string;
    decoded: string;
}

const initialState: MessagesState = {
    encodeLoading: false,
    decodeLoading: false,
    encoded: '',
    decoded: '',
}

export const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {},
    extraReducers: builder =>  {
        builder.addCase(createEncode.pending, (state) => {
            state.encoded = '';
            state.encodeLoading = true;
        });
        builder.addCase(createEncode.fulfilled, (state, {payload: decode}) => {
            state.encodeLoading = false;
            state.encoded = decode;
            state.decoded = '';
        });
        builder.addCase(createEncode.rejected, (state) => {
            state.encodeLoading = false;
        });
        builder.addCase(createDecode.pending, (state) => {
            state.decoded = '';
            state.decodeLoading = true;
        });
        builder.addCase(createDecode.fulfilled, (state, {payload: encode}) => {
            state.decodeLoading = false;
            state.decoded = encode;
            state.encoded = '';
        });
        builder.addCase(createDecode.rejected, (state) => {
            state.decodeLoading = false;
        });
    },
});

export const messagesReducer = messagesSlice.reducer;
export const selectEncodeLoading = (state: RootState) => state.messages.encodeLoading;
export const selectEncoded = (state: RootState) => state.messages.encoded;
export const selectDecodeLoading = (state: RootState) => state.messages.decodeLoading;
export const selectDecoded = (state: RootState) => state.messages.decoded

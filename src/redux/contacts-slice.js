import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const contactsInititalState = [];

const contactsSlice = createSlice({
    name: 'contacts',
    initialState: contactsInititalState,
    reducers: {
        addContact: {
            reducer(state, action) {
                return [...state, action.payload];
            },
            prepare(name, number) {
                return {
                    payload: {
                        id: nanoid(),
                        name,
                        number,
                    }
                }
            }
        },
        deleteContact(state, action) {
            return state.filter(contact => contact.id !== action.payload);
        }
    }
})

export const {addContact, deleteContact} = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
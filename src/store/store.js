import {writable} from 'svelte/store'; //making a store
//Stores are Svelte's way of managing state beyond local component state. 
//A writable store is a store that can be written to and read from Svelte components.

import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import { auth } from '../lib/firebase/firebase'


export const authStore = writable ({ //default state
    user: null,
    loading: true,
    data: {}
})

export const authHandlers = {
    signup: async (email, password) => {
        await createUserWithEmailAndPassword(auth, email, password)
    },
    login: async (email, password) => {
        await signInWithEmailAndPassword(auth, email, password)
    },
    logout: async () => {
        await signOut(auth)
    }

}
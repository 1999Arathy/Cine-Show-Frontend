import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState:{ user: null },
    
    reducers:{
        
        setUser: (state,action)=>{
            state.user = action.payload;
            window.localStorage.setItem('user',JSON.stringify(action.payload))
        },
        
        removeUser: (state)=>{
            state.user = null;
            window.localStorage.removeItem('user')
        },

        getUser : (state, action)=>{
            state.user = action.payload;
            window.localStorage.getItem('user.username')
        },
        
        getToken : (state,action)=>{
            state.user = action.payload;
            window.localStorage.getItem('user.token')    
        },

        setUserFromLocalStorage: (state)=>{
            var user = window.localStorage.getItem('user');
            if(user){
                user = JSON.parse(user);
                state.user = user;
            }else{
                state.user = null;
            }
        }
    }
});

export const {setUser, removeUser,setUserFromLocalStorage, getToken, getUser} = authSlice.actions

export default authSlice.reducer;
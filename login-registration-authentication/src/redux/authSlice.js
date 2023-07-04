import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    msg: "",
    user: "",
    token: "",
    loading: false,
    error: ""
}

export const registerdUsers = createAsyncThunk('registerdusers', async (response) => {
    const request = await fetch("http://localhost:8000/api/users", {
        method: "get",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(response)
    })
    return request.json();
})

export const currentUser = createAsyncThunk('userloggedin', async (payload) => {
    const { email } = payload;

    try {
        const request = await fetch(`http://localhost:8000/api/currentuser?email=${email}`, {
            method: "get",
            headers: {
                "Content-Type": "application/json"
            },
        });
        return request.json();
    } catch (error) {
        throw new Error(error.message);
    }
});


export const signUpUser = createAsyncThunk('signupuser', async (response) => {
    const request = await fetch("http://localhost:8000/api/register", {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(response)
    })
    return request.json();
})

export const signInUser = createAsyncThunk('signinuser', async (response) => {
    const request = await fetch("http://localhost:8000/api/login", {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(response)
    })
    return request.json();
})

const authenticationSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addToken: (state, action) => {
            state.token = localStorage.getItem("token")
        },
        addUser: (state, action) => {
            state.user = localStorage.getItem("user")
        },
        logout: (state, action) => {
            state.token = null;
            localStorage.clear();
        }
    },
    extraReducers: {
        [currentUser.pending]: (state, action) => {
            state.loading = true;
        },
        [currentUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message; // Access the error message from the action
        },
        [currentUser.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.userDetails = payload.userDetails;
        },
        [registerdUsers.pending]: (state, action) => {
            state.loading = true
        },
        [registerdUsers.rejected]: (state, action) => {
            state.loading = true
        },
        [registerdUsers.fulfilled]: (state, { payload: { error, msg } }) => {
            state.loading = false;
            if (error) {
                state.error = error;
            } else {
                state.msg = msg;
            }
        },
        // Login api calls
        [signInUser.pending]: (state, action) => {
            state.loading = true
        },
        [signInUser.rejected]: (state, action) => {
            state.loading = true
        },
        [signInUser.fulfilled]: (state, { payload: { error, msg, token, user } }) => {
            console.log("Check the message ==>>", state)
            state.loading = false;
            if (error) {
                state.error = error;
            } else {
                state.msg = msg;
                state.token = token;
                state.user = user;

                localStorage.setItem("msg", msg);
                localStorage.setItem("user", JSON.stringify(user));
                localStorage.setItem("token", token);
            }
        },
        // Code used for registration
        [signUpUser.pending]: (state, action) => {
            console.log("came to first block");
            state.loading = true
        },
        [signUpUser.rejected]: (state, action) => {
            console.log("came to second block", state.msg)
            state.loading = true
        },
        [signUpUser.fulfilled]: (state, { payload: { error, msg } }) => {
            console.log("came to third block", state)
            state.loading = false;
            if (error) {
                console.log("check the error ==>>", error)
                state.error = error;
            } else {
                state.msg = msg;
                console.log("check the message ==>>", state.msg)
            }
        }
    }
})

export const { addToken, addUser, logout } = authenticationSlice.actions

export const loggedUser = (state) => state.user.user;

export default authenticationSlice.reducer;
import { createSlice } from '@reduxjs/toolkit'

const user = createSlice({
  name: 'user',
  initialState: {
    name: null,
    email: null,
    accessToken: null,
    errors: null,
  },
  reducers: {
    setName: (store, action) => {
      store.name = action.payload
    },
    setEmail: (store, action) => {
      store.email = action.payload
    },
    setAccessToken: (store, action) => {
      store.accessToken = action.payload
    },
    setErrors: (store, action) => {
      store.errors = action.payload
    }
  }
})

export default user
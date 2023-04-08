import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  accessToken: undefined,
  user: undefined
}

const authAdminSlice = createSlice({
  name: 'authAdmin',
  initialState,
  reducers: {
    adminLogin: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user
    },
    adminLogOut: (state) => {
      state.accessToken = undefined;
      state.user = undefined;
    }
  }
})

export const { adminLogin, adminLogOut } = authAdminSlice.actions;
export default authAdminSlice.reducer;